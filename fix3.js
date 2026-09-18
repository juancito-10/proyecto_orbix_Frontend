const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('frontend/src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Only exact mojibake string replacements (safest)
    content = content.replace(/Ãš/g, 'Ú');
    content = content.replace(/Ã³/g, 'ó');
    content = content.replace(/Ã¡/g, 'á');
    content = content.replace(/Ã©/g, 'é');
    content = content.replace(/Ã±/g, 'ñ');
    content = content.replace(/Ã/g, 'í'); // wait, Ã might match Ãš before? No, they are executed in order.
    
    // Some others found in the grep
    content = content.replace(/Â¿/g, '¿');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed mojibake:', filePath);
    }
  }
});
