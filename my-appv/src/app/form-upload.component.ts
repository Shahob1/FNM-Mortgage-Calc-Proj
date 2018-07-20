import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./app.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  url;
  private isButtonVisible = false;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadService.uploadfile(file);
    this.url = "https://s3.us-east-2.amazonaws.com/mortgage-calc/classProject/" + file.name.toString();

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}