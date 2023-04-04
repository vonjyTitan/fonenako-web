import { LeaseOffer } from "../models/LeaseOffer";
import { LeaseOfferDetails } from "../models/LeaseOfferDetails";
import { LeaseOfferFilter } from "../models/LeaseOfferFilter";
import { Pageable } from "../models/Pageable";
import { SortableLeaseOfferField } from "../models/SortableLeaseOfferField";
import { SortInfo } from "../models/SortInfo";

export abstract class LeaseOfferService {
    public abstract retrieveLeaseOfferByPageAsync(pageIndex: number, sortInfo: SortInfo<SortableLeaseOfferField>, filter: LeaseOfferFilter): Promise<Pageable<LeaseOffer>> ;

    public abstract retrieveLeaseOfferDetailsAsync(leaseOfferId: number): Promise<LeaseOfferDetails>
}