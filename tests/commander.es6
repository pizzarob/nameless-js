import commander from '../src/server/commander';
import chai, { expect, to, be, a, deep, equal, have, property } from 'chai';

const services = [
    {
        name: 'test',
        services: {
            DO_SOMETHING(payload, resolve, reject) {
                const data = { message: 'It Worked!' };
                resolve(data);
            }
        }
    }

];

describe('commander', () => {

    describe('#commander()', () => {
        it('should return an object with the exec function', done => {
            const c = commander();
            expect(c).to.be.a('object');
            expect(c.exec).to.be.a('function');
            done();
        });
    });

    describe('#commander.exec()', () => {

        const c = commander(services);
        const exec = c.exec('test', 'DO_SOMETHING');

        it('should return a promise', done => {
            expect(exec).to.be.an.instanceof(Promise);
            done();
        });

        it('should reject the promise if action method does not exist', done => {
            c.exec('test', 'NO_EXIST').then(() => {
                done(new Error('Promise should not be resolved'));
            }, () => {
                done();
            });
        });

        it('should reject the promise if service name does not exist', done => {
            c.exec('no_exist', 'SOMETHING').then(() => {
                done(new Error('Promise should not be resolved'));
            }, () => {
                done();
            });
        });

        it('should return data passed to resolve', done => {
            exec.then(data => {
                expect(data).to.deep.equal({ message: 'It Worked!' });
                done();
            });
        });

    });
});

