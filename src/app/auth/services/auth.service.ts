import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier
} from '@angular/fire/auth';
import { BaseContext } from '../../core/context/base-context';
import { ErrorLog } from '../../models/error-log.model';
import { Timestamp } from '@angular/fire/firestore';
import { ErrorSuggestFixService } from '../../core/IA/error-suggest-fix.service';
import { ErrorLoggerService } from '../../core/error-manager/error-logger.service';
import { UserDataAccess } from '../../models/user.model';

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

      return await createUserWithEmailAndPassword(this._auth, user.email, user.password);
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
      return {
        success: false,
        error: errorMsg || 'Error desconocido'
      };
    }
  }

  async signIn(user: UserDataAccess) {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(this._auth, 'recaptcha-container', {
        size: 'invisible'
      });

      await recaptchaVerifier.verify();

      return await signInWithEmailAndPassword(this._auth, user.email, user.password);

    } catch (error) {
      if (error instanceof Error) {
        const context = this.getContext(error);
        const errSolution = await this._Gemini.EvaluateError(error.message);

        this.errorLog = {
          timestamp: Timestamp.now(),
          element: context.className,
          errorMessage: error.message,
          AISolution: errSolution
        }
      }
      else {
        const context = this.getContext();
        this.errorLog = {
          timestamp: Timestamp.now(),
          element: context.className,
          errorMessage: 'Error desconocido'
        }
      }
      this._errorLogService.saveErrorLog(this.errorLog);
      console.log('Error identificado, verificar con el admin el log de erorres');
      return {
        success: false,
        error: error || 'Error desconocido'
      };
    }
  }
}
