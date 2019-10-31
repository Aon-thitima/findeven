import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Group_chatInterface } from '../models/group_chat.intereface';

@Injectable({
  providedIn: 'root'
})
export class Group_chatService {
  [x: string]: any;

  // ตัวแปรเก็บค่า
  private group_chat: Observable<Group_chatInterface[]>;
  // เปรียบเหมือน คำว่า table
  private group_chatCollection: AngularFirestoreCollection<Group_chatInterface>;
  constructor(
    private afs: AngularFirestore,
  ) {
<<<<<<< HEAD:src/app/core/services/group_chat.service.ts
    this.group_chatCollection = this.afs.collection<Group_chatInterface>('groupchat'); // คำสั่งให้สร้าง table "activity" ชื่อตาราง
=======
    this.group_chatCollection = this.afs.collection<Group_chatInterface>('group_chat'); // คำสั่งให้สร้าง table "activity" ชื่อตาราง
>>>>>>> ee3d4a1b46d6b56f093a3d901a62022a0c2bb057:src/app/core/services/groupchat.service.ts
    this.group_chat = this.group_chatCollection.snapshotChanges()
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

     delateGroup_chat(id: string): Promise<void> {
        return this.group_chatCollection.doc(id).delete();
 }
}