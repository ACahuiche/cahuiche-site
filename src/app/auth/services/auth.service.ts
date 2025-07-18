import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  UserCredential
} from '@angular/fire/auth';
import { BaseContext } from '../../core/context/base-context';
import { ErrorLog } from '../../models/error-log.model';
import { Timestamp } from '@angular/fire/firestore';
import { ErrorSuggestFixService } from '../../core/IA/error-suggest-fix.service';
import { ErrorLoggerService } from '../../core/error-manager/error-logger.service';
import { UserDataAccess, UserDataCredential } from '../../models/user.model';
import { UserService } from '../../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseContext {

  constructor() {
    super();
  }

  private _auth = inject(Auth);
  private _Gemini = inject(ErrorSuggestFixService);
  private _errorLogService = inject(ErrorLoggerService);
  private _userService = inject(UserService);

  errorLog: ErrorLog = {
    timestamp: Timestamp.now(),
    element: '',
    errorMessage: ''
  };

  async signUp(user: UserDataAccess) {
    let errSolution:string = '';
    let errorMsg:string = '';

    try {
      const recaptchaVerifier = new RecaptchaVerifier(this._auth, 'recaptcha-container', {
        size: 'invisible'
      });

      await recaptchaVerifier.verify();

      const credential = await createUserWithEmailAndPassword(this._auth, user.email, user.password);
      await this._userService.registerUserData(credential.user.uid, user.name, user.isAdmin);
      return credential;
    } catch (error) {
      if (error instanceof Error) {
        const context = this.getContext(error);

        if(error.message.includes('auth/email-already-in-use')) {
          errorMsg = 'El correo ingresado ya ha sido registrado';
          errSolution = 'Es necesario el usuario eliga otro correo ya que el que ingreso ya se registro en el sistema';
        }
        else {
          errorMsg = error.message;
          errSolution = await this._Gemini.EvaluateError(error.message);
        }

        this.errorLog = {
          timestamp: Timestamp.now(),
          element: context.className,
          errorMessage: errorMsg,
          AISolution: errSolution
        }
      }
      else {
        const context = this.getContext();
        errorMsg = 'Error Desconocido';

        this.errorLog = {
          timestamp: Timestamp.now(),
          element: context.className,
          errorMessage: errorMsg
        }
      }
      this._errorLogService.saveErrorLog(this.errorLog);
      console.log('Error identificado, verificar con el admin el log de erorres');
      return this.errorLog;
    }
  }

  async signIn(user: UserDataCredential): Promise<UserCredential | ErrorLog> {
    let errSolution:string = '';
    let errorMsg:string = '';

    try {
      const recaptchaVerifier = new RecaptchaVerifier(this._auth, 'recaptcha-container', {
        size: 'invisible'
      });

      await recaptchaVerifier.verify();

      return await signInWithEmailAndPassword(this._auth, user.email, user.password);

    } catch (error) {
      if (error instanceof Error) {
        const context = this.getContext(error);

        if(error.message.includes('auth/invalid-credential')) {
          errorMsg = 'los datos ingresados son incorrectos';
          errSolution = 'Es necesario el usuario ingrese el usuario y contraseña correctos';
        }
        else {
          errorMsg = error.message;
          errSolution = await this._Gemini.EvaluateError(error.message);
        }

        this.errorLog = {
          timestamp: Timestamp.now(),
          element: context.className,
          errorMessage: errorMsg,
          AISolution: errSolution
        }
      }
      else {
        const context = this.getContext();
        errorMsg = 'Error Desconocido';

        this.errorLog = {
          timestamp: Timestamp.now(),
          element: context.className,
          errorMessage: errorMsg
        }
      }
      this._errorLogService.saveErrorLog(this.errorLog);
      console.log('Error identificado, verificar con el admin el log de erorres');
      return {...this.errorLog, isError: true};
    }
  }
}
