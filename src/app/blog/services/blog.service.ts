import { inject, Injectable, signal } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, query, Timestamp, updateDoc, where } from '@angular/fire/firestore';
import { AuthStateService } from '../../core/states/auth-state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Post, PostForm, PostSave } from '../../models/post.model';
import { UserService } from '../../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private _firestore = inject(Firestore);
  private _postsCollection = collection(this._firestore, 'posts')
  private _authState = inject(AuthStateService);
  private _userService = inject(UserService);

  loading = signal<boolean>(true);

  // Para el dashboard del usuario
  getPostsIndividual(): Observable<Post[]> {
    const uid = this._authState.currentUser?.uid;
    if (!uid) {
      return throwError(() => new Error('User not authenticated'));
    }
  
    const queryIndividual = query(
      this._postsCollection,
      where('userId', '==', uid)
    );
  
    return collectionData(queryIndividual, { idField: 'id' }) as Observable<Post[]>;
  }

  getPostsForAdmin(): Observable<Post[]> {
    const uid = this._authState.currentUser?.uid;
    if (!uid) {
      return throwError(() => new Error('User not authenticated'));
    }
  
    return collectionData(this._postsCollection, { idField: 'id' }) as Observable<Post[]>;
  }

  //Para la pagina principal
  getAllPosts = toSignal(
    (collectionData(query(
      this._postsCollection,
      where('isPublic', '==', true)
    ), {idField: 'id'}) as Observable<Post[]>).pipe(
      tap(() =>{
        this.loading.set(false);
      }),
      catchError(error => {
        this.loading.set(false);
        return throwError(() => error);
      })
    ), 
    {initialValue: []}
  )

  async create(postForm: PostForm) {
    const uid = this._authState.currentUser?.uid;
    if (!uid) {
      return throwError(() => new Error('User not authenticated'));
    }

    const userName = await this._userService.getUserData(uid);

    const post:PostSave = {...postForm, author: userName.name ,userId: uid};

    return addDoc(this._postsCollection, post);
  }

  async update(id: string, postForm: PostForm) {
    const uid = this._authState.currentUser?.uid;
    let userData = await this._userService.getUserData(uid);
    const docRef = doc(this._postsCollection, id);
    return updateDoc(docRef, {...postForm, lastModifyUser: userData.name ,lastUpdate: Timestamp.now()});
  }

  delete(id: string) {
    const docRef = doc(this._postsCollection, id);
    return deleteDoc(docRef);
  }

  getPost(id: string) {
    const docRef = doc(this._postsCollection, id);
    return getDoc(docRef);
  }

}
