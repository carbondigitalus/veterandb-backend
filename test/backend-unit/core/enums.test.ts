// NPM Modules
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import 'mocha';
import { AccountStatus, UserRole } from '../../../src/enums';
// Module Extenders
const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(sinonChai);
const sandbox = sinon.createSandbox();

describe('Node Core Tests', () => {
    afterEach(() => {
        sandbox.restore();
    });

    context('Core Enums Tests', () => {
        it('Enum: User Role', (done) => {
            // check each specific value
            expect(UserRole.Customer).to.include('customer');
            expect(UserRole.EmployeeAdmin).to.include('employee-admin');
            expect(UserRole.EmployeeCustomerService).to.include(
                'employee-customer-service'
            );
            expect(UserRole.EmployeeDatabaseAdmin).to.include(
                'employee-database-admin'
            );
            expect(UserRole.EmployeeDevBackEnd).to.include(
                'employee-dev-back-end'
            );
            expect(UserRole.EmployeeDevFrontEnd).to.include(
                'employee-dev-front-end'
            );
            expect(UserRole.EmployeeSuperAdmin).to.include(
                'employee-super-admin'
            );
            expect(UserRole.EmployeeTechSupport).to.include(
                'employee-technical-support'
            );
            // create array from options
            const role: string[] = Object.keys(UserRole).map((item) => {
                return item;
            });
            // check length of array
            expect(role).to.have.lengthOf(8);
            done();
        });
        it('Enum: Account Status', (done) => {
            expect(AccountStatus.Active).to.include('active');
            expect(AccountStatus.Archived).to.include('archvied');
            expect(AccountStatus.Hold).to.include('hold');
            expect(AccountStatus.Inactive).to.include('inactive');
            // create array from options
            const status: string[] = Object.keys(AccountStatus).map((item) => {
                return item;
            });
            // check length of array
            expect(status).to.have.lengthOf(4);
            done();
        });
    });
});
