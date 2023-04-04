import { SortDirection } from "./SortDirection";

export class SortInfo<TSortable> {
    constructor(public field: TSortable, public direction: SortDirection){}
}