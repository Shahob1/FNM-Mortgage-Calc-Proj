import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CalcComponent } from './calculator.component';
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
    AboutUsComponent,
    CalcAndRecentComponent,
    CalcComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
