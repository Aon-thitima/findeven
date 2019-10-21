import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivityInterface } from '../models/activity.interface';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activity: Observable<ActivityInterface[]>;
  private activityCollection: AngularFirestoreCollection<ActivityInterface>;
  constructor(
    private afs: AngularFirestore,
  ) {
    this.activityCollection = this.afs.collection<ActivityInterface>('activity');
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


  getActivity(): Observable<ActivityInterface[]> {
    return this.activity;
  }

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

  addActivity(activity: ActivityInterface): Promise<DocumentReference> {
    return this.activityCollection.add(activity);
  }

  updateActivity(activity: ActivityInterface): Promise<void> {
    return this.activityCollection.doc(activity.id).update({
      name: activity.name,
      place: activity.place,
      notes: activity.notes
    });
  }

  delateActivity(id: string): Promise<void> {
    return this.activityCollection.doc(id).delete();
  }
}