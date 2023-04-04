import { Component, OnInit } from '@angular/core';
import { LeaseOffer } from '../models/LeaseOffer';
import { LeaseOfferFilter } from '../models/LeaseOfferFilter';
import { Pageable } from '../models/Pageable';
import { PageInfo } from '../models/PageInfo';
import { SortableLeaseOfferField } from '../models/SortableLeaseOfferField';
import { SortDirection } from '../models/SortDirection';
import { SortInfo } from '../models/SortInfo';
import { SortOption } from '../models/SortOption';
import { LeaseOfferService } from '../services/LeaseOfferService';

@Component({
  selector: 'app-lease-offer-list',
  templateUrl: './lease-offer-list.component.html'
})
export class LeaseOfferListComponent implements OnInit{

  public leaseOfferList: LeaseOffer [] = [];

  public pageList: PageInfo[] = [];

  public leaseOfferFilter: LeaseOfferFilter = new LeaseOfferFilter(); 

  public sortInfo: SortInfo<SortableLeaseOfferField> = new SortInfo<SortableLeaseOfferField>(SortableLeaseOfferField.CreationDate, SortDirection.Desc);

  public sortOptions: SortOption<SortableLeaseOfferField>[] =
  [
    new SortOption<SortableLeaseOfferField>(SortableLeaseOfferField.CreationDate, "Date de Création"),
    new SortOption<SortableLeaseOfferField>(SortableLeaseOfferField.Surface, "Surface"),
    new SortOption<SortableLeaseOfferField>(SortableLeaseOfferField.MonthlyRent, "Location mensuel")
  ];

  currentAppiedFilter: LeaseOfferFilter = new LeaseOfferFilter();

  constructor (private leaseOfferService: LeaseOfferService){
  }

  public async ngOnInit(): Promise<void> {
    await this.retrieveLeaseOfferPageAsync(1);
  }

  public async requestPage(pageInfo: PageInfo): Promise<void> {
    await this.retrieveLeaseOfferPageAsync(pageInfo.pageIndex);
  }

  public async searchLeaseOffer(): Promise<void> {
    this.sortInfo = new SortInfo<SortableLeaseOfferField>(SortableLeaseOfferField.CreationDate, SortDirection.Desc);
    this.currentAppiedFilter = structuredClone(this.leaseOfferFilter);
    
    await this.retrieveLeaseOfferPageAsync(1);
  }

  public async resetSearchLeaseOffer(): Promise<void> {
    this.leaseOfferFilter = new LeaseOfferFilter(); 
    await this.searchLeaseOffer();
  }

  public async sortOptionChanged(): Promise<void> {
    await this.retrieveLeaseOfferPageAsync(1); 
  }

  private async retrieveLeaseOfferPageAsync(pageIndex: number): Promise<void> {
    try{
      const leaseOfferPage = await this.leaseOfferService.retrieveLeaseOfferByPageAsync(pageIndex, this.sortInfo, this.currentAppiedFilter);
      this.onLeaseOfferPageReceived(leaseOfferPage);
    }
    catch(error){
      console.error(error);
    }
  }

  private onLeaseOfferPageReceived(leaseOfferPageable: Pageable<LeaseOffer>): void {
    this.pageList.length = 0;
    this.leaseOfferList = leaseOfferPageable.content;
    for(let i = 1; i<= leaseOfferPageable.totalPage; i++) {
      this.pageList.push(new PageInfo(i, i == leaseOfferPageable.currentPage));
    }
  }
}
