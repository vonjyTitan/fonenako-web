import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { LeaseOfferFilter } from "../models/LeaseOfferFilter";
import { SortableLeaseOfferField } from "../models/SortableLeaseOfferField";
import { SortDirection } from "../models/SortDirection";
import { SortInfo } from "../models/SortInfo";
import { LeaseOfferServiceApi } from "./LeaseOfferServiceApi";

describe("leaseOfferServiceApi", ()=> {
    let injector: TestBed;
    let leaseOfferService: LeaseOfferServiceApi;
    let httpClientMock: HttpTestingController;

    beforeEach(()=> {
        injector = TestBed.configureTestingModule({
            imports:
                [HttpClientTestingModule],
            providers:
                [LeaseOfferServiceApi]
        });
        leaseOfferService = injector.inject(LeaseOfferServiceApi);
        httpClientMock = injector.inject(HttpTestingController);
    });

    it("retrieveLeaseOfferByPageAsync should throw error when called with wrong page value",async ()=> {
        await expectAsync(leaseOfferService.retrieveLeaseOfferByPageAsync(0, new SortInfo(SortableLeaseOfferField.CreationDate, SortDirection.Desc), new LeaseOfferFilter())).toBeRejectedWithError();
    });

    it("retrieveLeaseOfferByPageAsync should return correct page when called with correct args",async ()=> {

        var callAsync = leaseOfferService.retrieveLeaseOfferByPageAsync(1, new SortInfo(SortableLeaseOfferField.CreationDate, SortDirection.Desc), new LeaseOfferFilter());
        const requestMock = httpClientMock.expectOne((request) => {
            
            return request.url.endsWith("/Lease-offers")
            && request.params.get("page") == "1"
            && request.params.get("pageSize") == "20"
            && request.params.get("orderBy") == "creationDate"
            && request.params.get("order") == "Desc"
            && request.params.get("filter") == JSON.stringify(new LeaseOfferFilter());
        });
        requestMock.flush({
            content: [
                {
                    leaseOfferId: 1,
                    surface: 30,
                    monthlyRent: 900,
                    rooms: 3
                }
            ],
            currentPage: 1,
            totalPage: 10,
            pageSize: 20
        });

        const pageableResult = await callAsync;

        expect(pageableResult.totalPage).toBe(10);
        expect(pageableResult.currentPage).toBe(1);
        expect(pageableResult.pageSize).toBe(20);
        expect(pageableResult.content).toEqual([
            {
                leaseOfferId: 1,
                surface: 30,
                monthlyRent: 900,
                rooms: 3
            }
        ]);
    });

    it("retrieveLeaseOfferDetailsAsync should throw error when called with wrong leaseOfferId value",async ()=> {
        await expectAsync(leaseOfferService.retrieveLeaseOfferDetailsAsync(0)).toBeRejectedWithError();
    });

    it("retrieveLeaseOfferDetailsAsync should return the expected lease offer details",async ()=> {
        const callAsync = leaseOfferService.retrieveLeaseOfferDetailsAsync(1);
        httpClientMock.expectOne((request) => {
            return request.url.endsWith("/Lease-offers/1");
        }).flush({
            leaseOfferId: 1,
            surface: 40,
            monthlyRent: 900,
            rooms: 2,
            description: "My Description"
        });

        const callResult = await callAsync;

        expect(callResult).toEqual({
            leaseOfferId: 1,
            surface: 40,
            monthlyRent: 900,
            rooms: 2,
            description: "My Description"
        });
    });
});

