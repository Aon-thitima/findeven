import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportUserInterface } from '../models/report-user.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FireStoreDoc } from 'src/app/_constants/app.constant';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class ReportUserService {
    private reportUser: Observable<ReportUserInterface[]>;
    private reportUserCollection: AngularFirestoreCollection<ReportUserInterface>;
    constructor(
        private afs: AngularFirestore,
        private authenticationService: AuthenticationService
    ) {
        this.reportUserCollection = this.afs.collection<ReportUserInterface>(`${FireStoreDoc.REPORT_USER}`);
        this.reportUser = this.reportUserCollection.snapshotChanges()
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

    postReportUser(formData: ReportUserInterface) {
        Object.assign(formData, { createAt: new Date() })
        return this.reportUserCollection.add(formData);
    }

    checkUserReport(formData: ReportUserInterface) {
        try {
            return new Promise((resolve, reject) => {
                const res = this.afs.collection(`${FireStoreDoc.REPORT_USER}`,
                    ref => ref.where('activity_id', '==', `${formData.activity_id}`)
                        .where('user_id', '==', `${formData.user_id}`)
                        .where('reportAt', '==', `${formData.reportAt}`))
                    .valueChanges()
                res.subscribe(
                    (data) => {
                        resolve(data)
                    }, (err) => reject(err)
                )
            })
        } catch (error) {
        }
    }

    getUserReportDetail(uid: ReportUserInterface) {
        try {
            return new Promise((resolve, reject) => {
                const res = this.afs.collection(`${FireStoreDoc.REPORT_USER}`,
                    ref => ref.where('user_id', '==', `${uid}`))
                    .valueChanges()
                res.subscribe(
                    (data) => {
                        data.map(async val => Object.assign(val, {
                            userReportInfo: await this.authenticationService.getUserDetail(val['reportAt'])
                          }))
                        resolve(data)
                    }, (err) => reject(err)
                )
            })
        } catch (error) {
        }
    }

    getListUserReport() {
        try {
            return new Promise((resolve, reject) => {
                const res = this.afs.collectionGroup(`${FireStoreDoc.REPORT_USER}`).valueChanges()
                res.subscribe(async val => {
                    const userReport = []
                    const result = this.groupBy(val, (i) => i.user_id)
                    // tslint:disable-next-line:forin
                    for (const key in result) {
                        userReport.push({userInfo: await this.authenticationService.getUserDetail(key)})
                    }
                    resolve(userReport)
                }, (err) => reject(err))
            })
        } catch (error) {

        }
    }

    private groupBy(array, cb) {
        const groups = Object.create(null);
        array.forEach((o) => {
            const key = cb(o);
            groups[key] = groups[key] || [];
            groups[key].push(o);
        });
        return groups;
    }

}
