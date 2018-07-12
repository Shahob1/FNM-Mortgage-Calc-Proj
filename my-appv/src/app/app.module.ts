import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { CalcComponent } from './calculator.component';
import { FormUploadComponent } from './form-upload.component';
import { UploadFileService } from './upload-file.service';

@NgModule({
  declarations: [
    AppComponent,
    CalcComponent
    FormUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [UploadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
