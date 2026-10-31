import { readFileSync } from 'node:fs';
import { audit } from './audit.js';
try {
  if (process.argv.length !== 3) throw new Error('Usage: node cli.js inventory.csv');
  const result = audit(readFileSync(process.argv[2], 'utf8'));
  console.log(JSON.stringify(result,null,2));
  process.exitCode = result.errors.length ? 1 : 0;
} catch(error) { console.error(error.message); process.exitCode=2; }
