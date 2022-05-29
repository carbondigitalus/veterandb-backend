export class AccountStatus {
    Active: string;
    Inactive: string;
    Hold: string;
    Archived: string;
    constructor() {
        this.Active = 'active';
        this.Inactive = 'inactive';
        this.Hold = 'hold';
        this.Archived = 'archvied';
    }
}
