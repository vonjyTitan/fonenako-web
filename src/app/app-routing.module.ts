import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaseOfferDetailsComponent } from './lease-offer-details/lease-offer-details.component';
import { LeaseOfferListComponent } from './lease-offer-list/lease-offer-list.component';

const routes: Routes = [
  {path : "Lease-offers/:leaseOfferId", component : LeaseOfferDetailsComponent},
  {path : "Lease-offers", component : LeaseOfferListComponent},
  {path : "", redirectTo : "Lease-offers", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
