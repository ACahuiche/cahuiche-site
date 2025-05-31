const fs = require('fs');

const envConfigFile = `export const environment = {
  production: false,
  collectionLoggerName: 'errorlogs',
  collectionPosts: 'posts',
  geminiApiKey: '${process.env.GEMINI_API_KEY}',
  prompt: '${process.env.GEMINI_FIX_PROMPT}',
  firebase: {
    projectId: "${process.env.FIREBASE_PROJECT_ID}", 
    appId: "${process.env.FIREBASE_APP_ID}", 
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}", 
    apiKey: "${process.env.FIREBASE_API_KEY}", 
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}", 
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}" 
  },
  emailjs: {
    serviceId: '${process.env.EMAILJS_SERVICE_ID}',
    templateId: '${process.env.EMAILJS_TEMPLATE_ID}',
    userId: '${process.env.EMAILJS_USER_ID}'
  }
};
`;

fs.writeFileSync('./src/environments/environment.ts', envConfigFile);
console.log('environment.ts generado correctamente.');