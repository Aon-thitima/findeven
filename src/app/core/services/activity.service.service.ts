import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivityInterface } from '../models/activity.interface';
import { map, take } from 'rxjs/operators';
import { JoinActivityService } from './join-activity.service';
import { AuthenticationService } from './authentication.service';
import { UserInterface } from '../models/user.interface';
import * as firebase from 'firebase';
import { FireStoreDoc } from 'src/app/_constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  // ตัวแปรเก็บค่า
  private activity: Observable<ActivityInterface[]>;
  // เปรียบเหมือน คำว่า table
  private activityCollection: AngularFirestoreCollection<ActivityInterface>;
  public userInfo: UserInterface;
  constructor(
    private afs: AngularFirestore,
    private joinActivityService: JoinActivityService,
    private authService: AuthenticationService
  ) {
    this.activityCollection = this.afs.collection<ActivityInterface>(`${FireStoreDoc.ACTIVITY}`); // คำสั่งให้สร้าง table "activity" ชื่อตาราง
    this.getCurrentUser()
    this.activity = this.activityCollection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            // ตรวจสอบ  ลิมิต กิจกรรม
            this.joinActivityService.getActivityJoin(id)
              .then(val => (Number(data['people']) <= val['length']) ? Object.assign(data, { sold_out: true }) : '')
            // ตรวจสอบ เข้าร่วมกิจกรรม
            this.joinActivityService.getActivityJoinUser(id, this.userInfo.uid)
              .then(val => val['length'] > 0 && val[0]['activity_id'] === id ? Object.assign(data, { joined: true }) : '')
            Object.assign(data, { id })
            return data;
          });
        })
      );
  }


  searchActivity(search: string, reset) {
    return new Promise((resolve, reject) => {
      const activity = this.activityCollection.snapshotChanges()
        .pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              // ตรวจสอบ  ลิมิต กิจกรรม
              this.joinActivityService.getActivityJoin(id)
                .then(val => (Number(data['people']) <= val['length']) ? Object.assign(data, { sold_out: true }) : '')
              // ตรวจสอบ เข้าร่วมกิจกรรม
              this.joinActivityService.getActivityJoinUser(id, this.userInfo.uid)
                .then(val => val['length'] > 0 && val[0]['activity_id'] === id ? Object.assign(data, { joined: true }) : '')
              Object.assign(data, { id })
              // ถ้า  reset == true ให้ search
              if (reset) {
                if (data.Location === search) {
                  return data;
                }
              } else {
                 // ถ้า  reset == false ไม่ต้อง search
                return data;
              }
            });
          })
        );
      activity.subscribe(
        (data) => resolve(data.filter(v => v !== undefined)),
        (err) => reject(err)
      )
    })
  }

  // ดึงข้อมูล user ปัจจุบัน
  async getCurrentUser() {
    this.userInfo = await this.authService.getUser();
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
    delete activity['sold_out']
    delete activity['joined']
    Object.assign(activity, {createAt: firebase.firestore.FieldValue.serverTimestamp()})
    return this.activityCollection.add(activity);
  }

  // อัปเดทข้อมูลกิจกรรม
  updateActivity(activity: ActivityInterface): Promise<void> {
    delete activity['sold_out']
    delete activity['joined']
    Object.assign(activity, {updateAt: firebase.firestore.FieldValue.serverTimestamp()})
    return this.activityCollection.doc(activity.id).update(activity);
  }

  // ลบข้อมูลกิจกรรม
  delateActivity(id: string): Promise<void> {
    return this.activityCollection.doc(id).delete();
  }

  checkActivity(id) {
    return new Promise((resolve, reject) => {
      const res = this.activityCollection.doc<ActivityInterface>(id).valueChanges()
      res.subscribe(
        (data) => resolve(data),
        (err) => reject(err)
      )
    })
  }
}
