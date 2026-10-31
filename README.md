# Inventory CSV Auditor

![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-f7df1e) ![Dependencies](https://img.shields.io/badge/dependencies-zero-success)

A small, runnable portfolio demo that checks a shop inventory export and produces a JSON audit report. Demonstrates input validation, integer money calculations, command-line error handling, and automated tests.

## Run

Install Node.js 22 or newer. No packages or account setup required.

```sh
npm test
npm run demo
node cli.js your-inventory.csv
```

The included synthetic sample has 3 valid rows, total stock value **R457.38** (45738 cents), and 2 low-stock items. Prices are illustrative rand amounts; the engine stores currency-neutral cents.

## Input contract

Exact header: `sku,name,quantity,unitPrice,reorderLevel`. Quantities are non-negative whole numbers; prices have at most two decimal places. SKUs must be unique (case-sensitive). An item is low stock when its quantity is at or below its reorder level.

This intentionally supports simple unquoted CSV only: commas and newlines inside fields are unsupported. Invalid rows are reported with line numbers and excluded from totals. Review errors before using a partial report.

Exit codes: **0** clean report, **1** row validation errors, **2** file/usage/header errors. JSON reports include valid row count, total value in cents, low-stock records, and validation errors.

## Try extending it

- Add quoted-field CSV support with tests.
- Add category summaries and a documented output schema.
- Add a CI workflow that runs `npm test` on pull requests.

Contributions should describe a real improvement, include reproduction steps, and add relevant tests. Use fictional data in examples. Built as an AI-assisted learning demo, not a production inventory system.
