import { inject, Injectable, signal } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _firestore = inject(Firestore);
  private _docRefPermits = doc(this._firestore, 'config/permits');

  getPermitConfig(): Observable<any> {
    return docData(this._docRefPermits);
  }

  getPermitConfigValue$(key: string): Observable<any> {
    return new Observable((observer) => {
      docData(this._docRefPermits).subscribe((data) => {
        observer.next(data?.[key]);
      });
    });
  }
}
