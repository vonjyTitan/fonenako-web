import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaseOffer } from '../models/LeaseOffer';
import { LeaseOfferService } from './LeaseOfferService';
import { lastValueFrom, Observable } from 'rxjs';
import { Pageable } from '../models/Pageable';
import { LeaseOfferFilter } from '../models/LeaseOfferFilter';
import { environment } from 'src/environments/environment';
import { SortInfo } from '../models/SortInfo';
import { SortableLeaseOfferField } from '../models/SortableLeaseOfferField';
import { LeaseOfferDetails } from '../models/LeaseOfferDetails';

const resourceName: string = "Lease-offers";

@Injectable({
  providedIn: 'root'
})
export class LeaseOfferServiceApi implements LeaseOfferService {

  constructor(private httpClient: HttpClient) { }

  public async retrieveLeaseOfferDetailsAsync(leaseOfferId: number): Promise<LeaseOfferDetails> {
    if(leaseOfferId < 1) {
      throw new Error('Method not implemented.');
    }

    return await lastValueFrom(this.httpClient.get<LeaseOfferDetails>(`${environment.fonenakoWebApiUrl}/${resourceName}/${leaseOfferId}`));
  }

  async retrieveLeaseOfferByPageAsync(pageIndex: number, sortInfo: SortInfo<SortableLeaseOfferField>, filter: LeaseOfferFilter): Promise<Pageable<LeaseOffer>> 
  {
    if(pageIndex < 1) {
      throw new Error(`Page index value : ${pageIndex} is not valid`);
    }

    let params = new HttpParams()
    .append("page", pageIndex)
    .append("pageSize", environment.defaultLeaseOfferPageSize)
    .append("orderBy", sortInfo.field.toString())
    .append("order", sortInfo.direction.toString())
    .append("filter",  JSON.stringify(filter));

     return await lastValueFrom(this.httpClient.get<Pageable<LeaseOffer>>(`${environment.fonenakoWebApiUrl}/${resourceName}`, {params}));
  }
}
