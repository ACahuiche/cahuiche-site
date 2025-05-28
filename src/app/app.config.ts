import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()), 
    provideFirebaseApp(() => initializeApp({ 
      projectId: environment.firebase.projectId , 
      appId: environment.firebase.appId, 
      storageBucket: environment.firebase.storageBucket , 
      apiKey: environment.firebase.apiKey , 
      authDomain: environment.firebase.authDomain , 
      messagingSenderId: environment.firebase.messagingSenderId })), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore())]
};
