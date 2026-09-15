const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.css')) results.push(file);
    }
  });
  return results;
}

const files = walk('frontend/src');
files.forEach(f => {
  let buf = fs.readFileSync(f);
  if (buf.includes(0x00)) {
    console.log('Found null byte in:', f);
  }
});
