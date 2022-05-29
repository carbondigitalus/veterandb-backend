export class UserRole {
    EmployeeDevFrontEnd: string;
    EmployeeDevBackEnd: string;
    EmployeeDatabaseAdmin: string;
    EmployeeCustomerService: string;
    EmployeeTechSupport: string;
    EmployeeAdmin: string;
    EmployeeSuperAdmin: string;
    Customer: string;

    constructor() {
        this.EmployeeDevFrontEnd = 'employee-dev-front-end';
        this.EmployeeDevBackEnd = 'employee-dev-back-end';
        this.EmployeeDatabaseAdmin = 'employee-database-admin';
        this.EmployeeCustomerService = 'employee-customer-service';
        this.EmployeeTechSupport = 'employee-technical-support';
        this.EmployeeAdmin = 'employee-admin';
        this.EmployeeSuperAdmin = 'employee-super-admin';
        this.Customer = 'customer';
    }
}
