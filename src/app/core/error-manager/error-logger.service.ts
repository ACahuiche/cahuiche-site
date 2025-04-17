import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AuthStateService } from '../../core/states/auth-state.service';
import { environment } from '../../environments/environment';
import { ErrorLog } from '../../models/error-log.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggerService {

  private _firestore = inject(Firestore);
  private _authState = inject(AuthStateService);
  private _errorLogCollection = collection(this._firestore, environment.collectionLoggerName);

  saveErrorLog(errorLog: ErrorLog) {
    return addDoc(this._errorLogCollection, {
      ...errorLog,
      userId: this._authState.currentUser?.uid
    });
  }


}
