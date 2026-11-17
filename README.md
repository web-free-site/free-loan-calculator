# Free Loan Calculator

Client-side loan payment and amortization calculator for [free-loan-calculator.web-free.site](https://free-loan-calculator.web-free.site).

## Base & license

Calculation core is derived from [TekiDeki/Loan-Calculator](https://github.com/TekiDeki/Loan-Calculator) (Apache-2.0). See `LICENSE` and [/about](https://free-loan-calculator.web-free.site/about).

## Development

```bash
npm test
```

Static assets live in `public/`. Deploy with Cloudflare Workers (`wrangler.toml`); not deployed from this agent run.

## Features

- User-entered amount, rate, and term (no baked-in bank rates)
- Currency display labels: RWF, CDF, XOF/XAF (FCFA), EUR, USD
- Amortization table, extra payments, CSV and print/PDF export
- English guides and legal pages with SEO metadata