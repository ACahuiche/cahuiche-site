const fs = require('fs');
const path = require('path');

const dir = './src/environments';
const filePath = path.join(dir, 'environment.ts');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const envConfigFile = `export const environment = {
  production: true,
  ai:{
    models: {
      gem15pro : 'gemini-1.5-pro-latest',
      gem15lite : 'gemini-1.5-flash-latest',
      gem20lite : 'gemini-2.0-flash-lite',
      gem25lite : 'gemini-2.5-flash'
    },
    geminiApiKey: '${process.env.GEMINI_API_KEY}',
    promptToFixErrors: 'Arregla el siguiente error que recibo en mi sistema hecho con angular, muestrame la solucion sin mostrarme codigo, el error es el siguiente: ',
    promptImproveTitle: 'Eres un redactor en un blog de tecnologia profesional, el blog esta basado solo en texto y emojis, necesito que mejores el siguiente titulo para captar mas la atencion y hacerlo mas llamativo, como respuesta solo dame el nuevo titulo, no m digas nada mas que no sea el nuevo titulo mejorado, el titulo que vas a mejorar es el siguiente: ',
    promptPostBytitle: 'Tu eres un redactor de un blog de tecnologia profesional, genera un post para un blog, el cual este basado solo en texto y emojis, usando terminologia para capturar la atencion sin verse demasiado exagerado, como respuesta solo dame el post, no m digas nada mas que no sea el post ni repitas el titulo, es de suma importancia que no me digas el titulo en ninguna parte del post, si lo agregas, eliminalo del post, el titulo del post es el siguiente: '
  },
  firebase: {
    projectId: "${process.env.FIREBASE_PROJECT_ID}", 
    appId: "${process.env.FIREBASE_APP_ID}", 
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}", 
    apiKey: "${process.env.FIREBASE_API_KEY}", 
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}", 
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}" ,
    collectionLoggerName: 'errorlogs'
  },
  emailjs: {
    serviceId: '${process.env.EMAILJS_SERVICE_ID}',
    templateId: '${process.env.EMAILJS_TEMPLATE_ID}',
    userId: '${process.env.EMAILJS_USER_ID}'
  }
};
`;

fs.writeFileSync(filePath, envConfigFile);
console.log('environment.ts generado correctamente.');