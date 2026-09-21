const fs = require('fs');
const file = 'frontend/src/pages/DashboardInventario/MovimientosInventario.css';
const buf = fs.readFileSync(file);
const utf8Part = buf.subarray(0, 4205).toString('utf8');
const utf16Part = buf.subarray(4205).toString('utf16le');
fs.writeFileSync(file, utf8Part + utf16Part, 'utf8');
console.log('Fixed mixed encoding');
