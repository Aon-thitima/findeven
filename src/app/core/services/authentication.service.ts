import { Injectable } from '@angular/core';
import { RegisterInterface } from '../models/register.interface';
import { AuthInterface } from '../models/auth.interface';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { UserInterface } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, first} from 'rxjs/operators';
import { FireStoreDoc } from '../../_constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user$: Observable<UserInterface>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<UserInterface>(`${FireStoreDoc.USER_PROFILE}/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  register(value: RegisterInterface): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        (res) => this.updateProfile(res.user.uid, value),
        (err) => {}
      );
  }

  async loginUser(value: AuthInterface) {
    return await firebase.auth().signInWithEmailAndPassword(value.email, value.password);
  }

  async logoutUser() {
    return await firebase.auth().signOut();
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  private updateProfile(uid: string, user: RegisterInterface) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`${FireStoreDoc.USER_PROFILE}/${uid}`);

    const data = {
      uid,
      email: user.email,
      fullName: user.fullName,
      address: user.address,
      phone: user.phone,
      imageProfile: user.imageProfile,
      sex: user.sex
      // imageProfile: user.imageProfile
    };

    userRef.set(data, { merge: true });
  }

}
