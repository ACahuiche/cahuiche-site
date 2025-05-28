import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _firestore = inject(Firestore);

  private usersCollection = collection(this._firestore, 'users');

  async registerUserData(uid: string, name: string): Promise<void> {
    const userRef = doc(this.usersCollection, uid);
    await setDoc(userRef, {
      uid,
      name,
      createdAt: new Date()
    });
  }

  async getUserName(uid:string) {

    const userDocRef = doc(this._firestore, 'users', uid);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      throw new Error('No se encontró el usuario en Firestore');
    }

    const userData = userSnap.data() as { name: string };

    return userData.name;

  }
}
