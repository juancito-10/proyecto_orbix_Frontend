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
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Accents in UI text (inside JSX tags or strings)
    // We can do simple replacements for common misspelled words
    const replacements = {
      'Configuracion': 'Configuración',
      'Configuraciónes': 'Configuraciones',
      'Cerrar Sesion': 'Cerrar Sesión',
      'Iniciar Sesion': 'Iniciar Sesión',
      'iniciar sesion': 'iniciar sesión',
      'Iniciando Sesion': 'Iniciando Sesión',
      'Iniciando sesion': 'Iniciando sesión',
      'Gestión de': 'Gestión de', // just in case
      'Categoria': 'Categoría',
      'Categorias': 'Categorías',
      'Ultimos': 'Últimos',
      'Ultimas': 'Últimas',
      'Accion': 'Acción',
      'Acciones': 'Acciones',
      'Dias': 'Días',
      'Atras': 'Atrás',
      'Exito': 'Éxito',
      'exito': 'éxito',
      'Exitosamente': 'Exitosamente', // Exitosamente is correct without accent
      'Teléfono': 'Teléfono',
      'Telefono': 'Teléfono',
      'Codigo': 'Código',
      'codigo': 'código',
      'Numero': 'Número',
      'numero': 'número',
      'Informacion': 'Información',
      'informacion': 'información',
      'Mas info': 'Más info',
      'mas ': 'más ',
      'Mas ': 'Más '
    };

    for (let key in replacements) {
       // Only replace if it's a whole word, using regex boundary \b
       let regex = new RegExp('\\b' + key + '\\b', 'g');
       content = content.replace(regex, replacements[key]);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Spelling Fixed:', filePath);
    }
  }
});
