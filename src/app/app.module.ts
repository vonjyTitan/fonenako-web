import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaseOfferListComponent } from './lease-offer-list/lease-offer-list.component';
import { LeaseOfferService } from './services/LeaseOfferService';
import { LeaseOfferServiceApi } from './services/LeaseOfferServiceApi';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LeaseOfferDetailsComponent } from './lease-offer-details/lease-offer-details.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaseOfferListComponent,
    LeaseOfferDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide : LeaseOfferService, useClass : LeaseOfferServiceApi}],
  bootstrap: [AppComponent]
})
export class AppModule { }
