import { inject } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, from, map, of } from 'rxjs';


export const registerAccessGuard: CanActivateFn = () => {
    const router = inject(Router);
    const firestore = inject(Firestore);

    const permitsDocRef = doc(firestore, 'config', 'permits');

    return from(getDoc(permitsDocRef)).pipe(
        map(snapshot => {
            const data = snapshot.data();
            const isAllowed = data?.['registerAccess'];

            if (!isAllowed) {
                router.navigateByUrl('/blog');
                return false;
            }

            return true;
        }),
        catchError(error => {
            console.error('Error al consultar permisos en Firebase 🥺:', error);
            router.navigateByUrl('/blog');
            return of(false);
        })
    );
};