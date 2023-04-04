export class LeaseOfferFilter {

  public surfaceMin: number | null = null;

  public surfaceMax: number | null = null;

  public monthlyRentMin: number | null = null;

  public monthlyRentMax: number | null = null;

  public rooms: number | null = null;

  public isFilled(): boolean {
    return this.surfaceMin != null || this.surfaceMax != null || this.monthlyRentMax != null || this.monthlyRentMin != null || this.rooms != null;
  }
}