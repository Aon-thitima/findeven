import { async } from '@angular/core/testing';
import { ActivityService } from './activity.service.service';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FireStoreDoc } from 'src/app/_constants/app.constant';
import { map } from 'rxjs/operators';
import { JoinChatInterface } from '../models/join-chat.intereface';
import * as firebase from 'firebase';
import { SPORT_GROUP } from 'src/assets/data-master/sport-group';

@Injectable({
  providedIn: 'root'
})
export class JoinChatService {
  private joinChat: Observable<JoinChatInterface[]>;
  private joinChatCollection: AngularFirestoreCollection<JoinChatInterface>;
  public sportMaster = SPORT_GROUP
  constructor(
    private afs: AngularFirestore,
    private activityService: ActivityService
  ) {
    this.joinChatCollection = this.afs.collection<JoinChatInterface>(`${FireStoreDoc.JOIN_CHAT}`); // คำสั่งให้สร้าง table "join chat" ชื่อตาราง
    this.joinChat = this.joinChatCollection.snapshotChanges()
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

  joinChats(joinChatsData: JoinChatInterface): Promise<DocumentReference> {
    Object.assign(joinChatsData, { createAt: firebase.firestore.FieldValue.serverTimestamp() })
    return this.joinChatCollection.add(joinChatsData);
  }

  getListChatJoin(userId) {
    return new Promise((resolve, reject) => {
      this.joinChat = this.joinChatCollection.snapshotChanges()
        .pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              this.activityService.checkActivity(data.activity_id)
                .then(activityInfo => {
                  Object.assign(data, {
                    activityInfo,
                    image: this.sportMaster.filter(v => v.id === activityInfo['group_sport'] ? v.image : '')[0].image
                  }
                  )
                }
                )
              Object.assign(data, { id })
              return data;
            });
          })
        );
      this.joinChat.subscribe(
        (data) => { resolve(data.filter(val => val.user_id === userId)) }, // ดึงแชทตาม id
        (err) => { reject(err) }
      )
    })
  }

  delateChat(id: string): Promise<void> {
    return this.joinChatCollection.doc(id).delete();
  }
}
