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
    
    // Replace mojibake and broken unicode
    content = content.replace(/Ãš/g, 'Ú');
    content = content.replace(/Ã³/g, 'ó');
    content = content.replace(/Ã¡/g, 'á');
    content = content.replace(/Ã©/g, 'é');
    content = content.replace(/Ã±/g, 'ñ');
    content = content.replace(/ǭ/g, 'á');
    content = content.replace(/ǧ/g, 'ú');
    content = content.replace(/Ǹ/g, 'é');
    
    // Also manual fixes for lost characters that became '' or something
    // We will just do a string replace for words that we KNOW are misspelled because of the character loss.
    content = content.replace(/contrasea/g, 'contraseña');
    content = content.replace(/Contrasea/g, 'Contraseña');
    content = content.replace(/sesin/g, 'sesión');
    content = content.replace(/Sesin/g, 'Sesión');
    content = content.replace(/electrnico/g, 'electrónico');
    content = content.replace(/Gestin/g, 'Gestión');
    content = content.replace(/Olvidaste/g, '¿Olvidaste');
    content = content.replace(/ELIMINACI"N/g, 'ELIMINACIÓN');
    content = content.replace(/ELIMINACIN/g, 'ELIMINACIÓN');
    content = content.replace(/rdenes/g, 'Órdenes');
    content = content.replace(/Perodo/g, 'Período');
    content = content.replace(/rea/g, 'área');
    content = content.replace(/sltimos/g, 'Últimos');
    content = content.replace(/sltimas/g, 'Últimas');
    content = content.replace(/ms/g, 'más');
    content = content.replace(/Ms/g, 'Más');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed:', filePath);
    }
  }
});
