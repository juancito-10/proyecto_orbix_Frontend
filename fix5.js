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
    
    // Replace U+FFFD within known words
    content = content.replace(/contrase\ufffda/g, 'contraseña');
    content = content.replace(/Contrase\ufffda/g, 'Contraseña');
    content = content.replace(/sesi\ufffdn/g, 'sesión');
    content = content.replace(/Sesi\ufffdn/g, 'Sesión');
    content = content.replace(/electr\ufffdnico/g, 'electrónico');
    content = content.replace(/\ufffdOlvidaste/g, '¿Olvidaste');
    content = content.replace(/Gesti\ufffdn/g, 'Gestión');
    content = content.replace(/\ufffdrdenes/g, 'Órdenes');
    content = content.replace(/Per\ufffdodo/g, 'Período');
    content = content.replace(/ELIMINACI\ufffd\"N/g, 'ELIMINACIÓN');
    content = content.replace(/ELIMINACI\ufffdN/g, 'ELIMINACIÓN');
    content = content.replace(/\ufffdrea/g, 'área');
    content = content.replace(/m\ufffds/g, 'más');
    content = content.replace(/M\ufffds/g, 'Más');
    content = content.replace(/despu\ufffds/g, 'después');
    content = content.replace(/seg\ufffdn/g, 'según');
    content = content.replace(/an\ufffdlisis/g, 'análisis');
    content = content.replace(/m\ufffdtricas/g, 'métricas');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed U+FFFD:', filePath);
    }
  }
});
