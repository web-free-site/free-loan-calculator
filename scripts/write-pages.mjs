import fs from 'fs';
import path from 'path';

const SITE = 'https://free-loan-calculator.web-free.site';
const baseCss = `  <link rel="stylesheet" href="/css/site.css">
  <style>
    body.wf-guide{margin:0}
    .wf-guide-header,.wf-guide-main{max-width:46rem;margin:0 auto;padding:1rem 1.15rem}
    .wf-guide-header{display:flex;flex-wrap:wrap;gap:.75rem 1.25rem;align-items:baseline;border-bottom:1px solid var(--line)}
    .wf-guide-header a{color:inherit;text-decoration:none;font-weight:700}
    .wf-guide-header nav a{font-weight:500;text-decoration:underline;margin-right:.8rem;color:var(--muted)}
    .wf-guide-main h1{margin:.4rem 0 1rem;font-size:1.85rem;line-height:1.25}
    .wf-guide-main h2{margin:1.6rem 0 .5rem;font-size:1.2rem}
    .wf-guide-main p,.wf-guide-main li{margin:0 0 .75rem}
    .wf-guide-main ol,.wf-guide-main ul{padding-left:1.25rem}
    .wf-guide-main .wf-cta{margin:1.5rem 0}
  </style>`;

function shell({ title, description, slug, bodyHtml, extraJsonLd = '' }) {
  const canonical = `${SITE}/${slug}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="robots" content="index,follow">
${baseCss}
${extraJsonLd}
<script src="https://ref.web-free.site/r.js" defer></script>
</head>
<body class="wf-guide">
  <header class="wf-guide-header">
    <a href="/">Free Loan Calculator</a>
    <nav aria-label="Page">
      <a href="/">Open the calculator</a>
      <a href="https://web-free.site/">All free tools</a>
    </nav>
  </header>
  <main class="wf-guide-main">
    <article>
      ${bodyHtml}
      <p class="wf-cta">Try the <a href="/">Free Loan Calculator</a> — enter your own amount, rate, and term. Not financial advice.</p>
    </article>
  </main>
  <footer class="foot wf-guide-main">
    <nav aria-label="Footer"><a href="/about">About</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="https://github.com/TekiDeki/Loan-Calculator">Upstream (Apache-2.0)</a> · <a href="https://web-free.site/">web-free.site</a></nav>
  </footer>
  <script src="/wf-ads.js" defer></script>
</body>
</html>`;
}

const pages = [
  {
    slug: 'how-to-calculate-a-loan-payment-from-your-salary',
    title: 'How to calculate a loan payment from your salary',
    description:
      'Estimate an affordable loan payment from your take-home pay using your own numbers in Free Loan Calculator. Planning guide, not lending advice.',
    body: `<h1>How to calculate a loan payment from your salary</h1>
<p>Lenders look at income, existing debt, and policy limits. This guide helps you <em>plan</em> a monthly payment using your own salary and expense figures—not preset bank rates.</p>
<h2>Steps</h2>
<ol>
<li><strong>Know your net monthly income.</strong> Use take-home pay after tax and mandatory deductions.</li>
<li><strong>List fixed costs.</strong> Rent, utilities, transport, insurance, and minimum debt payments.</li>
<li><strong>Set a payment ceiling.</strong> Many households aim to keep total debt payments below a portion of net income; your comfort level may differ.</li>
<li><strong>Enter your loan in the calculator.</strong> Type the amount you might borrow, the annual interest rate quoted to you, and the term in years or months.</li>
<li><strong>Compare the monthly payment</strong> to your ceiling. Adjust amount or term until the payment fits your budget.</li>
</ol>
<h2>Currency labels</h2>
<p>If you earn in RWF, CDF, or FCFA, pick the matching display label. The tool does not convert currencies or pull live rates.</p>
<h2>Not financial advice</h2>
<p>Affordability rules vary by country and lender. This page is educational; verify eligibility with a qualified adviser or creditor.</p>`,
    jsonLd: `<script type="application/ld+json">{"@context":"https://schema.org","@type":"HowTo","name":"How to calculate a loan payment from your salary","description":"Plan a monthly loan payment against your take-home pay using your own loan amount, rate, and term.","inLanguage":"en","step":[{"@type":"HowToStep","position":1,"name":"Know net monthly income","text":"Use take-home pay after tax."},{"@type":"HowToStep","position":2,"name":"Set a payment ceiling","text":"Decide how much of net income you can devote to debt service."},{"@type":"HowToStep","position":3,"name":"Enter loan details","text":"Type principal, annual rate, and term in Free Loan Calculator."},{"@type":"HowToStep","position":4,"name":"Compare payment to budget","text":"Adjust amount or term until the monthly payment fits."}]}</script>`,
  },
  {
    slug: 'how-to-use-a-car-loan-calculator-with-extra-payments',
    title: 'How to use a car loan calculator with extra payments',
    description:
      'See how optional extra monthly payments shorten a car loan and cut interest using Free Loan Calculator.',
    body: `<h1>How to use a car loan calculator with extra payments</h1>
<p>Auto loans are usually fixed-rate and level-payment. Adding even a small extra amount each month can reduce total interest and the number of payments.</p>
<h2>Steps</h2>
<ol>
<li>Enter the vehicle loan amount you were quoted—not a sample rate from the internet.</li>
<li>Type the annual percentage rate from your finance offer.</li>
<li>Set the term (often 36–72 months).</li>
<li>In <strong>Extra monthly payment</strong>, enter an amount you could add consistently.</li>
<li>Review <strong>Saved with extra payments</strong>, the chart, and the amortization table.</li>
<li>Export <strong>CSV</strong> or <strong>Print / save PDF</strong> for your records.</li>
</ol>
<h2>Tips</h2>
<ul>
<li>Confirm whether your lender applies extras to principal without penalties.</li>
<li>One-time fees can be added in the optional fees field for a rough total cost.</li>
</ul>
<p>Results are estimates only—not financial advice.</p>`,
    jsonLd: '',
  },
  {
    slug: 'how-to-read-a-mortgage-amortization-schedule',
    title: 'How to read a mortgage amortization schedule',
    description:
      'Understand payment number, principal, interest, and remaining balance columns in a mortgage amortization table.',
    body: `<h1>How to read a mortgage amortization schedule</h1>
<p>An amortization schedule shows how each payment splits between interest and principal until the balance reaches zero.</p>
<h2>Columns</h2>
<ul>
<li><strong>No.</strong> — payment sequence.</li>
<li><strong>Date</strong> — due date based on your start date (first payment one month later).</li>
<li><strong>Payment</strong> — regular installment (level payment loans).</li>
<li><strong>Extra</strong> — optional additional principal you entered.</li>
<li><strong>Principal</strong> — portion that reduces the balance.</li>
<li><strong>Interest</strong> — charge on the remaining balance for that period.</li>
<li><strong>Balance</strong> — amount still owed after the payment.</li>
</ul>
<h2>Mortgage planning</h2>
<p>Enter your own home loan amount and rate. For long terms (e.g. 30 years), early rows show more interest than principal; later rows flip. Display labels such as USD or RWF do not change the math.</p>
<h2>Disclaimer</h2>
<p>Real mortgages may include escrow, insurance, PMI, and different day-count conventions. Use this schedule for planning; verify with your servicer.</p>`,
    jsonLd: '',
  },
  {
    slug: 'how-to-compare-two-loan-offers',
    title: 'How to compare two loan offers side by side',
    description:
      'Compare two loan offers by monthly payment, total interest and total cost including fees, using your own figures in Free Loan Calculator. Not financial advice.',
    body: `<h1>How to compare two loan offers side by side</h1>
<p>When two lenders (or two products from the same lender) offer you money, the offer with the lowest interest rate is not always the cheapest, and the offer with the lowest monthly payment is often the most expensive overall. Running both offers through the same calculator with your own numbers makes the trade-off visible.</p>
<h2>Step 1: Collect the same facts for each offer</h2>
<ul>
<li><strong>Loan amount</strong> you would actually receive.</li>
<li><strong>Annual interest rate</strong> as quoted, and whether it is fixed or variable.</li>
<li><strong>Term</strong> in months or years.</li>
<li><strong>One-time fees</strong>: application, processing or insurance fees paid at the start.</li>
<li><strong>Conditions</strong>: penalties for early repayment, and whether extra payments go to principal.</li>
</ul>
<h2>Step 2: Run offer A</h2>
<p>Open the <a href="/">Free Loan Calculator</a>, enter the amount, rate and term, and put the fees in <strong>One-time fees (optional)</strong>. Write down the monthly payment, the total interest and the <strong>Total cost (incl. fees)</strong>.</p>
<h2>Step 3: Run offer B with the same amount</h2>
<p>Change only the rate, term and fees to match the second offer. Keeping the loan amount identical is what makes the comparison fair.</p>
<h2>Step 4: Read the two results together</h2>
<p>A worked example with the standard fixed-payment formula, for a loan of 10,000 (any currency) and no fees:</p>
<ul>
<li><strong>Offer A</strong>: 12% a year over 3 years → about 332.14 per month, about 1,957 total interest.</li>
<li><strong>Offer B</strong>: 10% a year over 5 years → about 212.47 per month, about 2,748 total interest.</li>
</ul>
<p>Offer B has the lower rate and a much lower monthly payment, but because you pay for two more years it costs roughly 790 more in interest. Offer A is cheaper overall, but only if the higher payment fits your budget comfortably.</p>
<h2>Step 5: Add fees and extra payments</h2>
<p>A low-rate offer with a large upfront fee can end up more expensive than a slightly higher rate with no fee, especially on short loans. If you plan to pay extra each month, use <strong>Extra monthly payment</strong> on both offers—but first confirm with each lender that extra payments are allowed without a penalty.</p>
<h2>What this comparison does not cover</h2>
<p>Lenders may use different rounding, payment dates, variable rates, mandatory insurance or taxes. If an offer states an APR or effective annual rate, use it as an extra check, since it is meant to include some fees. Ask each lender for its own repayment schedule before you sign.</p>
<p>Related guides: <a href="/how-to-read-a-mortgage-amortization-schedule">how to read an amortization schedule</a> and <a href="/how-to-calculate-a-loan-payment-from-your-salary">how to calculate a loan payment from your salary</a>.</p>`,
    jsonLd: `<script type="application/ld+json">{"@context":"https://schema.org","@type":"HowTo","name":"How to compare two loan offers side by side","description":"Compare two loan offers by monthly payment, total interest and total cost including fees, using your own figures in Free Loan Calculator. Not financial advice.","inLanguage":"en","url":"${SITE}/how-to-compare-two-loan-offers","step":[{"@type":"HowToStep","position":1,"name":"Collect both offers","text":"Write down the amount, annual rate, term and any one-time fees for each offer."},{"@type":"HowToStep","position":2,"name":"Run offer A","text":"Enter offer A in Free Loan Calculator and note the monthly payment, total interest and total cost."},{"@type":"HowToStep","position":3,"name":"Run offer B","text":"Enter offer B with the same loan amount and note the same three figures."},{"@type":"HowToStep","position":4,"name":"Compare","text":"Compare the monthly payment against your budget and the total cost against each other, then check the conditions with the lender."}]}</script>`,
  },
  {
    slug: 'about',
    title: 'About Free Loan Calculator',
    description:
      'About Free Loan Calculator: client-side loan payments and amortization, based on TekiDeki/Loan-Calculator (Apache-2.0).',
    body: `<h1>About Free Loan Calculator</h1>
<p>Free Loan Calculator is a browser-based tool on <a href="https://web-free.site/">web-free.site</a>. You enter loan amount, annual interest rate, and term; the page computes monthly payment, total interest, payoff date, and a full amortization schedule with optional extra payments.</p>
<h2>Upstream project</h2>
<p>Calculation logic is derived from <a href="https://github.com/TekiDeki/Loan-Calculator">TekiDeki/Loan-Calculator</a> by Kristian Mario Mišković, licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License 2.0</a>. A copy of the license is in the repository <code>LICENSE</code> file. We thank the upstream author for publishing this work.</p>
<h2>What we changed</h2>
<ul>
<li>Rebranded for web-free.site with English-only content and additional guides.</li>
<li>Currency display labels (RWF, CDF, FCFA, EUR, USD) without FX APIs.</li>
<li>CSV and print/PDF export of the schedule.</li>
<li>No sample bank rates—you supply every figure.</li>
</ul>
<p>This is not financial, tax, or legal advice.</p>`,
    jsonLd: `<script type="application/ld+json">{"@context":"https://schema.org","@type":"AboutPage","name":"About Free Loan Calculator","url":"${SITE}/about","inLanguage":"en"}</script>`,
  },
  {
    slug: 'privacy',
    title: 'Privacy — Free Loan Calculator',
    description: 'Privacy policy for Free Loan Calculator: client-side calculations, local preferences, and advertising.',
    body: `<h1>Privacy</h1>
<p><strong>Last updated:</strong> November 2026</p>
<h2>Loan data</h2>
<p>Calculations run entirely in your browser. Loan amounts, rates, and schedules are not sent to our servers as part of the calculator.</p>
<h2>Local storage</h2>
<p>We may store theme and currency label preferences in your browser's local storage on this device only.</p>
<h2>Advertising</h2>
<p>This site may show ads via third-party partners (Adsterra). Those partners may use cookies or similar technologies under their own policies. Ad domains include bauval.org, abscloud.org, and araplhn.org.</p>
<h2>Hosting</h2>
<p>The site is hosted on Cloudflare Workers static assets. Standard server and analytics logs may apply.</p>
<h2>Contact</h2>
<p>Questions: see <a href="/contact">Contact</a>.</p>`,
    jsonLd: '',
  },
  {
    slug: 'terms',
    title: 'Terms — Free Loan Calculator',
    description: 'Terms of use for Free Loan Calculator on web-free.site.',
    body: `<h1>Terms of use</h1>
<p>By using Free Loan Calculator you agree to these terms.</p>
<h2>Service</h2>
<p>The tool is provided free of charge as-is for personal planning. We do not provide loans, brokerage, or financial advice.</p>
<h2>Accuracy</h2>
<p>Results are mathematical estimates based on the numbers you enter. Lenders may use different rounding, fees, or schedules. You are responsible for verifying figures before committing to credit.</p>
<h2>Intellectual property</h2>
<p>Site branding and guides are published by web-free.site. Calculator core incorporates software from TekiDeki/Loan-Calculator under Apache-2.0; see <a href="/about">About</a>.</p>
<h2>Limitation of liability</h2>
<p>To the fullest extent permitted by law, we are not liable for decisions you make based on this calculator.</p>`,
    jsonLd: '',
  },
  {
    slug: 'contact',
    title: 'Contact — Free Loan Calculator',
    description: 'Contact information for Free Loan Calculator on web-free.site.',
    body: `<h1>Contact</h1>
<p>Free Loan Calculator is part of the <a href="https://web-free.site/">web-free.site</a> collection of browser-based tools.</p>
<p>For site or tool issues, open an issue on the <a href="https://github.com/web-free-site/free-loan-calculator">GitHub repository</a> if available, or use the contact options listed on <a href="https://web-free.site/">web-free.site</a>.</p>
<p>We cannot provide personal financial advice or rate quotes.</p>`,
    jsonLd: '',
  },
];

const root = path.join(process.cwd(), 'public');
for (const p of pages) {
  const dir = path.join(root, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'index.html'),
    shell({
      title: p.title,
      description: p.description,
      slug: p.slug,
      bodyHtml: p.body,
      extraJsonLd: p.jsonLd,
    }),
  );
}
console.log('Wrote', pages.length, 'pages');