import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GroupchatInterface } from '../models/groupchat.intereface';

@Injectable({
  providedIn: 'root'
})
export class GroupchatService {
  [x: string]: any;

  // ตัวแปรเก็บค่า
  private groupchat: Observable<GroupchatInterface[]>;
  // เปรียบเหมือน คำว่า table
  private groupchatCollection: AngularFirestoreCollection<GroupchatInterface>;
  constructor(
    private afs: AngularFirestore,
  ) {
    this.groupchatCollection = this.afs.collection<GroupchatInterface>('groupchat'); // คำสั่งให้สร้าง table "activity" ชื่อตาราง
    this.groupchat = this.groupchatCollection.snapshotChanges()
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
}