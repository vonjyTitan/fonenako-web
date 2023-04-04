import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LeaseOfferDetails } from '../models/LeaseOfferDetails';
import { LeaseOfferService } from '../services/LeaseOfferService';

const pathIdName = "leaseOfferId";

@Component({
  selector: 'app-lease-offer-details',
  templateUrl: './lease-offer-details.component.html'
})
export class LeaseOfferDetailsComponent implements OnInit {

  public leaseOfferDetails: LeaseOfferDetails | undefined;

  constructor(private route: ActivatedRoute, private leaseOfferService: LeaseOfferService) {}

  public async ngOnInit(): Promise<void> {
    const paramMap = this.route.snapshot.paramMap;
    if(!paramMap.has(pathIdName)) {
      throw new Error(`Missing mandatory path variable : ${pathIdName}`);
    }

    const leaseOfferIdAsString = paramMap.get(pathIdName);
    if(!leaseOfferIdAsString) {
      throw new Error(`Invalid path variable : ${pathIdName} value`);
    }

    const leaseOfferId = parseInt(leaseOfferIdAsString);
    if(leaseOfferId < 1) {
      throw new Error(`${pathIdName} value : '${leaseOfferId}' is unprocessable`);
    }

    await this.loadLeaseOfferDetails(leaseOfferId);
  }

  async loadLeaseOfferDetails(leaseOfferId: number): Promise<void> {
    try {
      this.leaseOfferDetails = await this.leaseOfferService.retrieveLeaseOfferDetailsAsync(leaseOfferId);
    }
    catch(error){
      console.error(error);
    }
  }
}
