export function audit(csv) {
  const lines = csv.replace(/^\uFEFF/, '').trim().split(/\r?\n/);
  if (lines.shift() !== 'sku,name,quantity,unitPrice,reorderLevel') throw new Error('Expected header: sku,name,quantity,unitPrice,reorderLevel');
  const seen = new Set(), items = [], errors = [];
  for (const [i, line] of lines.entries()) {
    const parts = line.split(',').map(x => x.trim());
    const [sku, name, qty, price, level] = parts;
    const quantity = Number(qty), reorderLevel = Number(level);
    if (parts.length !== 5 || !sku || !name || !/^\d+$/.test(qty) || !/^\d+$/.test(level) || !/^\d+(\.\d{1,2})?$/.test(price) || !Number.isSafeInteger(quantity) || !Number.isSafeInteger(reorderLevel)) {
      errors.push({line:i+2, message:'Expected SKU, name, non-negative whole quantities and price with at most two decimals'}); continue;
    }
    if (seen.has(sku)) { errors.push({line:i+2,message:`Duplicate SKU: ${sku}`}); continue; }
    const cents = Math.round(Number(price)*100);
    if (!Number.isSafeInteger(cents*quantity)) { errors.push({line:i+2,message:'Value exceeds safe integer range'}); continue; }
    seen.add(sku);
    items.push({sku,name,quantity,unitPriceCents:cents,reorderLevel});
  }
  const totalValueCents = items.reduce((sum,x)=>sum+x.quantity*x.unitPriceCents,0);
  if (!Number.isSafeInteger(totalValueCents)) throw new Error('Total exceeds safe integer range');
  return {validRows:items.length,totalValueCents,lowStock:items.filter(x=>x.quantity<=x.reorderLevel),errors};
}
