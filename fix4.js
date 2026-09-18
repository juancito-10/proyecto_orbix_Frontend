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
    
    content = content.replace(/contrasea/g, 'contraseña');
    content = content.replace(/Contrasea/g, 'Contraseña');
    content = content.replace(/sesin/g, 'sesión');
    content = content.replace(/Sesin/g, 'Sesión');
    content = content.replace(/electrnico/g, 'electrónico');
    content = content.replace(/Olvidaste/g, '¿Olvidaste');
    content = content.replace(/Gestin/g, 'Gestión');
    content = content.replace(/rdenes/g, 'Órdenes');
    content = content.replace(/Perodo/g, 'Período');
    content = content.replace(/ELIMINACI\"N/g, 'ELIMINACIÓN');
    content = content.replace(/ELIMINACIN/g, 'ELIMINACIÓN');
    
    // Some that might have been hit by Ã replacement
    content = content.replace(/Ã/g, 'í');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed U+FFFD:', filePath);
    }
  }
});
