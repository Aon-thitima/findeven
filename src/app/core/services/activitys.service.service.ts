import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivitysInterface } from '../models/activitys.interface';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivitysService {

  // ตัวแปรเก็บค่า
  private activitys: Observable<ActivitysInterface[]>;
  // เปรียบเหมือน คำว่า table
  private activitysCollection: AngularFirestoreCollection<ActivitysInterface>;
  constructor(
    private afs: AngularFirestore,
  ) {
    this.activitysCollection = this.afs.collection<ActivitysInterface>('activity'); // คำสั่งให้สร้าง table "activity" ชื่อตาราง
    this.activitys = this.activitysCollection.snapshotChanges()
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
  // get ข้อมูลกิจกรรมทั้งหมด
  getActivitys(): Observable<ActivitysInterface[]> {
    return this.activitys;
  }

  // get ข้อมูลกิจกรรมตาม id
  getActivitysDetail(id: string): Observable<ActivitysInterface> {
    return this.activitysCollection.doc<ActivitysInterface>(id).valueChanges()
      .pipe(
        take(1),
        map(activitys => {
          activitys.id = id;
          return activitys;
        })
      );
  }

  // เพิ่มข้อมูลกิจกรรม
  addActivitys(activitys: ActivitysInterface): Promise<DocumentReference> {
    return this.activitysCollection.add(activitys);
  }

    // อัปเดทข้อมูลกิจกรรม
  updateActivitys(activitys: ActivitysInterface): Promise<void> {
    return this.activitysCollection.doc(activitys.id).update(activitys);
  }

   // ลบข้อมูลกิจกรรม
  delateActivity(id: string): Promise<void> {
    return this.activitysCollection.doc(id).delete();
  }
}
