import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Upload } from "app/shared/services/upload";
import { AngularFireModule } from "angularfire2";
import * as firebase from 'firebase';
import { AuthService } from "app/shared/services/auth.service";

@Injectable()
export class UploadService {
  constructor(
    private _af: AngularFireModule,
    private _db: AngularFireDatabase
  ) { }

  basePath: string;
  private uploadTask: firebase.storage.UploadTask;
  uploads: FirebaseListObservable<Upload>;
  keys: any[] = []; // keys for uploaded assignment
  submissions = [];

  pushUpload(upload: Upload, basePath: string, asnDetailKey) {
    this.keys = [];
    this.basePath = basePath;
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = this.uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        upload.asnDetailKey = asnDetailKey;
        this.saveFileData(upload, asnDetailKey);
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload, asnDetailKey) {
    const asnKey = this._db.list(`${this.basePath}/`).push(upload);
    this.keys.push(asnKey.key);

    if (this.basePath == '/submissions/' + AuthService.uid + '/')
      this._db.list(`/submission-detail/${asnDetailKey}/${AuthService.uid}`).push(true); 

  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
      .then(() => {
        this.deleteFileStorage(upload.name)
      })
      .catch(error => console.log(error))
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this._db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

}
