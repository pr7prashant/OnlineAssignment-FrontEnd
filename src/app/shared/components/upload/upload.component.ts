import { Component, OnInit, Output, Input } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { Upload } from '../../services/upload';
import * as _ from "lodash";

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;
  @Input() basePath: string;
  @Input() asnDetailKey: string;

  constructor(private upSvc: UploadService) { }

  ngOnInit() { }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  /*uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload)
  }*/

  uploadMulti() {
    let files = this.selectedFiles
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUpload(this.currentUpload, this.basePath, this.asnDetailKey);
    })
  }

}
