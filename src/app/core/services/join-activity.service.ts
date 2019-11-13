import { async } from '@angular/core/testing';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { JoinActivityInterface } from './../models/join-activity.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FireStoreDoc } from 'src/app/_constants/app.constant';
import * as firebase from 'firebase';
import { AuthenticationService } from './authentication.service';
import { ActivityService } from './activity.service.service';

@Injectable({
  providedIn: 'root'
})
export class JoinActivityService {
  private joinActivitys: Observable<JoinActivityInterface[]>;
  private joinActivitysCollection: AngularFirestoreCollection<JoinActivityInterface>;
  constructor(
    private afs: AngularFirestore,
    private authenticationService: AuthenticationService,
  ) {
    this.joinActivitysCollection = this.afs.collection<JoinActivityInterface>(`${FireStoreDoc.JOIN_ACTIVITY}`); // คำสั่งให้สร้าง table "activity" ชื่อตาราง
    this.joinActivitys = this.joinActivitysCollection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  // เข้าร่วมกิจกรรม
  joinActivity(joinActivity: JoinActivityInterface): Promise<DocumentReference> {
    Object.assign(joinActivity, { createAt: firebase.firestore.FieldValue.serverTimestamp() })
    return this.joinActivitysCollection.add(joinActivity);
  }

  // ลบข้อมูลกิจกรรม
  unJoinActivity(activityId: string, userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.joinActivitys.subscribe(joinActivitys => {
        joinActivitys.map(val => {
          if (val['activity_id'] === activityId && val['user_id'] === userId) {
            this.joinActivitysCollection.doc(val['id']).delete()
              .catch(_ => {
                const result = { description: 'notSuccess' }
                reject()
              })
              .then(_ => {
                const result = { description: 'success' }
                resolve(result)
              })
          }
        })
      })

    })
  }

  // check กิจกรรม
  getActivityJoin(activityId: string) {
    return new Promise((resolve, reject) => {
      const res = this.afs.collection(`${FireStoreDoc.JOIN_ACTIVITY}`, ref => ref.where('activity_id', '==', `${activityId}`)).valueChanges()
      res.subscribe(
        (data) => resolve(data),
        (err) => reject(err)
      )
    })
  }


  // check กิจกรรม by คน
  getActivityJoinUser(activityId: string, userId: string) {
    return new Promise((resolve, reject) => {
      const res = this.afs.collection(`${FireStoreDoc.JOIN_ACTIVITY}`, ref => ref.where('activity_id', '==', `${activityId}`).where('user_id', '==', `${userId}`)).valueChanges()
      res.subscribe(
        (data) => resolve(data),
        (err) => reject(err)
      )
    })
  }

  getUserJoinActivityByActivityID(activityId: string) {
    try {
      return new Promise((resolve, reject) => {
        const res = this.afs.collection(`${FireStoreDoc.JOIN_ACTIVITY}`, ref => ref.where('activity_id', '==', `${activityId}`)).valueChanges()
        res.subscribe(
          (data) => {
            data.map(async val => Object.assign(val, {
              userInfo: await this.authenticationService.getUserDetail(val['user_id'])
            }))
            resolve(data)
          }
          ,
          (err) => reject(err)
        )
      })
    } catch (error) {

    }
  }


  getJoinActivityByUserID(userId: string) {
    try {
      return new Promise((resolve, reject) => {
        const res = this.afs.collection(`${FireStoreDoc.JOIN_ACTIVITY}`, ref => ref.where('user_id', '==', `${userId}`)).valueChanges()
        res.subscribe(
          (data) => {
            data.map(async val => Object.assign(val, {
              userInfo: await this.authenticationService.getUserDetail(val['user_id']),
              // activityInfo: await this.activityService.checkActivity(val['activity_id'])
            }))
            resolve(data)
          }
          ,
          (err) => reject(err)
        )
      })
    } catch (error) {

    }
  }
}
