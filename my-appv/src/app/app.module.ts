import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { CalcComponent } from './calculator.component';
import { FormUploadComponent } from './form-upload.component';
import { UploadFileService } from './upload-file.service';
import { CreateCsvComponent } from './create-csv/create-csv.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcComponent,
    FormUploadComponent,
    CreateCsvComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [UploadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }