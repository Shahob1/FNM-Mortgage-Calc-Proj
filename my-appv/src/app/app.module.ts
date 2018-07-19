import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CalcComponent } from './calculator.component';
import { FormUploadComponent } from './form-upload.component';
import { UploadFileService } from './upload-file.service';
import { CreateCsvComponent } from './create-csv/create-csv.component';
import { AboutUsComponent } from './aboutUs.component';
import { CalcAndRecentComponent } from './calcAndRecent.component';
import { RecentComponent } from './recent.component';
import { LandingComponent } from './landing.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'calculator', component: CalcAndRecentComponent },
  { path: 'about-us', component: AboutUsComponent },

];


@NgModule({
  declarations: [
    AppComponent,
    CalcComponent,
    FormUploadComponent,
    CreateCsvComponent,
    AboutUsComponent,
    CalcAndRecentComponent,
    RecentComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [UploadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }






// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms'

// import { AppComponent } from './app.component';
// import { CalcComponent } from './calculator.component';
// import { FormUploadComponent } from './form-upload.component';
// import { UploadFileService } from './upload-file.service';
// import { CreateCsvComponent } from './create-csv/create-csv.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     CalcComponent,
//     FormUploadComponent,
//     CreateCsvComponent
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule
//   ],
//   providers: [UploadFileService],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }