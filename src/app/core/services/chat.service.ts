import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatCollection: AngularFirestoreCollection<any>;
  constructor(
    private afs: AngularFirestore,
  ) {
    this.chatCollection = this.afs.collection<any>('chat');
  }

  joinGroup(data: any): Promise<DocumentReference> {
    return this.chatCollection.add(data);
  }

  getChat(): Observable<any[]> {
    return this.afs.collection('chat', ref => ref.orderBy("createdAt", "asc")).valueChanges();
  }

  sendMessage(chat: any): Promise<DocumentReference> {
    return this.chatCollection.add(chat);
  }

  leftGroup(data: any): Promise<DocumentReference> {
    return this.chatCollection.add(data);
  }

  checkStatusJoin(joinBy: string, groupId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afs.collection('chat', ref =>
        ref.where('joinBy', '==', joinBy)
          .where('groupID', '==', groupId)
      ).valueChanges().subscribe(
        val => resolve((val.length === 0) ? true : val.some((v) => v['status'] === 'inactive')),
        err => reject(err)
      );
    });
  }

  // update status
  updateStatusJoin(joinBy: string, groupId: string) {
    const itemsCollection = this.afs.collection('chat', ref =>
      ref.where('joinBy', '==', joinBy)
        .where('groupID', '==', groupId));
    const items = itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    items.subscribe(val => {
      if (val.length !== 0) {
        val = val.filter(v => v['status'] === 'inactive');
        val.map(item => {
          this.afs.collection('chat').doc(item['id']).ref.update({
            status: 'active',
          }
          );
        });
      }
    });
  }
}