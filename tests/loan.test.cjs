// Tests for the pure calculation core in public/index.html (CORE:BEGIN … CORE:END).
// Run: node tests/loan.test.cjs
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
const m = html.match(/\/\* CORE:BEGIN[\s\S]*?\*\/\n([\s\S]*?)\/\* CORE:END \*\//);
if (!m) throw new Error('CORE block not found');
const core = new Function(
  m[1] +
    '\nreturn { toCents, levelPaymentCents, addMonths, buildSchedule, scheduleToCsv, buildPrintDocument, csvEscape, formatIsoDate };',
)();
const { levelPaymentCents, addMonths, buildSchedule, scheduleToCsv, buildPrintDocument, csvEscape } = core;

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('PASS', name);
  } catch (e) {
    console.log('FAIL', name, '\n   ', e.message);
    process.exitCode = 1;
  }
}
const near = (actual, expected, tol, msg) =>
  assert.ok(Math.abs(actual - expected) <= tol, `${msg || ''} expected ~${expected}, got ${actual}`);

// —— upstream TekiDeki reference tests ——
test('level payment matches reference: 100000 at 6% for 360 months = 599.55', () => {
  const s = buildSchedule({ principal: 100000, annualRatePct: 6, months: 360 });
  assert.equal(s.paymentCents, 59955);
});

test('250000 at 4.5% for 240 months = 1581.62', () => {
  assert.equal(buildSchedule({ principal: 250000, annualRatePct: 4.5, months: 240 }).paymentCents, 158162);
});

test('schedule ends exactly at zero and principal repaid equals loan amount (cents exact)', () => {
  const s = buildSchedule({ principal: 100000, annualRatePct: 6, months: 360 });
  assert.equal(s.rows.length, 360);
  assert.equal(s.rows[s.rows.length - 1].balance, 0);
  const principal = s.rows.reduce((a, r) => a + r.principal, 0);
  assert.equal(principal, 10000000);
});

test('extra payments shorten the loan, reduce interest and still end at zero', () => {
  const base = buildSchedule({ principal: 100000, annualRatePct: 6, months: 360 });
  const fast = buildSchedule({ principal: 100000, annualRatePct: 6, months: 360, extra: 200 });
  assert.ok(fast.count < base.count, 'fewer payments');
  assert.ok(fast.totalInterestCents < base.totalInterestCents, 'less interest');
  assert.equal(fast.rows[fast.rows.length - 1].balance, 0);
});

test('addMonths keeps day of month and clamps to month end', () => {
  const feb = addMonths(new Date(2027, 0, 31), 1);
  assert.equal(feb.getMonth(), 1);
  assert.equal(feb.getDate(), 28);
});

// —— salary-style personal loan ——
test('salary-style loan: 18000 at 11.9% for 48 months', () => {
  const s = buildSchedule({ principal: 18000, annualRatePct: 11.9, months: 48 });
  assert.ok(s.paymentCents > 0);
  assert.equal(s.rows[s.rows.length - 1].balance, 0);
  assert.ok(s.count <= 48);
});

// —— car loan with extra payments ——
test('car loan with extra payments: 28000 at 5.9% for 60 months + 75 extra', () => {
  const base = buildSchedule({ principal: 28000, annualRatePct: 5.9, months: 60 });
  const fast = buildSchedule({ principal: 28000, annualRatePct: 5.9, months: 60, extra: 75 });
  assert.ok(fast.count < base.count);
  assert.ok(fast.totalInterestCents < base.totalInterestCents);
  assert.equal(fast.rows[fast.rows.length - 1].balance, 0);
});

// —— mortgage-style term (30 years) ——
test('mortgage term: 320000 at 6.75% for 360 months', () => {
  const s = buildSchedule({ principal: 320000, annualRatePct: 6.75, months: 360 });
  assert.equal(s.rows.length, 360);
  assert.equal(s.rows[359].balance, 0);
});

// —— large principal RWF label scenario (math only; currency is display) ——
test('mortgage-scale principal in RWF display context: 45M at 8.5% for 240 months', () => {
  const s = buildSchedule({ principal: 45000000, annualRatePct: 8.5, months: 240 });
  assert.equal(s.rows[s.rows.length - 1].balance, 0);
  assert.ok(s.paymentCents > 0);
});

test('EUR display scenario: 150000 at 3.2% for 300 months', () => {
  const s = buildSchedule({ principal: 150000, annualRatePct: 3.2, months: 300 });
  assert.equal(s.rows.length, 300);
  assert.equal(s.rows[299].balance, 0);
});

// —— CSV export ——
test('scheduleToCsv has header and one row per payment', () => {
  const s = buildSchedule({ principal: 12000, annualRatePct: 5, months: 12 });
  const start = new Date(2026, 0, 15);
  const csv = scheduleToCsv(s, start);
  assert.ok(csv.startsWith('No,Date,Payment'));
  const lines = csv.trim().split('\n');
  assert.equal(lines.length, 1 + s.count);
});

test('csvEscape quotes fields with commas', () => {
  assert.equal(csvEscape('a,b'), '"a,b"');
});

// —— PDF / print HTML ——
test('buildPrintDocument includes schedule title and table rows', () => {
  const s = buildSchedule({ principal: 5000, annualRatePct: 0, months: 5 });
  const doc = buildPrintDocument({
    title: 'Loan amortization schedule',
    summaryLines: ['Monthly payment: 1000'],
    rows: s.rows.map((r) => ({
      n: r.n,
      date: '2026-01-01',
      payment: '1000',
      extra: '0',
      principal: '1000',
      interest: '0',
      balance: '0',
    })),
  });
  assert.ok(doc.includes('Loan amortization schedule'));
  assert.ok(doc.includes('<table>'));
  assert.ok(doc.includes('not financial advice'));
  const trCount = (doc.match(/<tr>/g) || []).length;
  assert.ok(trCount >= 5, `expected at least 5 table rows, got ${trCount}`);
});

console.log(`\n${passed} tests passed` + (process.exitCode ? ' (with failures)' : ''));