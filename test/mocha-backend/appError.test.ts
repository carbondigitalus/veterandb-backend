// NPM Modules
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import 'mocha';

// Module Extenders
const { expect } = chai;
chai.use(chaiAsPromised);
chai.use(sinonChai);
const sandbox = sinon.createSandbox();

// Custom Modules

describe('Utility Tests', () => {
    afterEach(() => {
        sandbox.restore();
    });

    context('App Error Function Tests', () => {
        it('Node Version: should be v14.x or greater', (done) => {
            const versionRaw = process.version;
            const versionMajor = versionRaw.split('v')[1];
            const versionNumber = parseInt(versionMajor);
            expect(versionNumber).to.be.a('number');
            expect(versionNumber).to.be.at.least(14);
            done();
        });
        it('Node Env: should be development', (done) => {
            const nodeENV = process.env.NODE_ENV;
            expect(nodeENV).to.equal('development');
            done();
        });
    });
});
