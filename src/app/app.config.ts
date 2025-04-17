import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "cahui-blog", appId: "1:862760255541:web:509500fdf9517a1c92317c", storageBucket: "cahui-blog.firebasestorage.app", apiKey: "AIzaSyDWXpBuAZ-_UmpQy665mliHehyk7IkWkFs", authDomain: "cahui-blog.firebaseapp.com", messagingSenderId: "862760255541" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
