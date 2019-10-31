import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivityInterface } from '../models/activity.interface';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  // ตัวแปรเก็บค่า
  private activity: Observable<ActivityInterface[]>;
  // เปรียบเหมือน คำว่า table
  private activityCollection: AngularFirestoreCollection<ActivityInterface>;
  constructor(
    private afs: AngularFirestore,
  ) {
    this.activityCollection = this.afs.collection<ActivityInterface>('activity'); // คำสั่งให้สร้าง table "activity" ชื่อตาราง
    this.activity = this.activityCollection.snapshotChanges()
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
  getActivity(): Observable<ActivityInterface[]> {
    return this.activity;
  }

  // get ข้อมูลกิจกรรมตาม id
  getActivityDetail(id: string): Observable<ActivityInterface> {
    return this.activityCollection.doc<ActivityInterface>(id).valueChanges()
      .pipe(
        take(1),
        map(activity => {
          activity.id = id;
          return activity;
        })
      );
  }

  // เพิ่มข้อมูลกิจกรรม
  addActivity(activity: ActivityInterface): Promise<DocumentReference> {
    return this.activityCollection.add(activity);
  }

    // อัปเดทข้อมูลกิจกรรม
  updateActivity(activity: ActivityInterface): Promise<void> {
    return this.activityCollection.doc(activity.id).update(activity);
  }

   // ลบข้อมูลกิจกรรม
  delateActivity(id: string): Promise<void> {
    return this.activityCollection.doc(id).delete();
  }
}
