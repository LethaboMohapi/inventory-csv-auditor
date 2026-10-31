import {test} from 'node:test';
import assert from 'node:assert/strict';
import {audit} from './audit.js';
const h='sku,name,quantity,unitPrice,reorderLevel\n';
test('uses cents and includes items at reorder threshold',()=>{const r=audit(h+'A,Rice,2,12.50,2\nB,Soap,3,4.10,1');assert.equal(r.totalValueCents,3730);assert.deepEqual(r.lowStock.map(x=>x.sku),['A']);});
test('reports duplicate and malformed rows without counting them',()=>{const r=audit(h+'A,Rice,2,1.00,1\nA,Duplicate,3,1,1\nB,Bad,-2,1,0');assert.equal(r.validRows,1);assert.equal(r.errors.length,2);assert.equal(r.errors[0].line,3);});
test('rejects wrong headers and unsafe values',()=>{assert.throws(()=>audit('wrong'));assert.equal(audit(h+'A,Item,9999999999999999,1,0').errors.length,1);});
test('accepts BOM, CRLF, empty dataset and zero stock',()=>{assert.equal(audit('\uFEFF'+h.replace('\n','\r\n')+'A,Item,0,0.00,0').lowStock.length,1);assert.equal(audit(h).validRows,0);});
