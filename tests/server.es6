import chai, { expect, to, be, a, deep, equal, have, property } from 'chai';
import express from 'express';
import Nameless from '../server';
import http from 'http';


const services = [
    {
        name: 'test',
        services: {
            DO_SOMETHING(payload, resolve, reject) {
                resolve(payload);
            }
        }
    }

];


describe('nameless/server', () => {

    const app = express();
    const nameless = Nameless({
        apiPrefix: '/api',
        services,
    }, app);
    app.listen(3333, () => {

        describe('#Nameless(...)', () => {
            it('should return an object with a commander function and apiPrefix', done => {
                expect(nameless).to.have.property('commander');
                expect(nameless).to.have.property('apiPrefix');
                expect(nameless.commander).to.be.a('object');
                expect(nameless.commander).to.have.property('exec');
                expect(nameless.apiPrefix).to.be.a('string');
                done();
            });

            it('should have created a route for our service and return our message', done => {
                const message = JSON.stringify({
                    action: 'DO_SOMETHING',
                    payload: {
                        message: 'hi'
                    }
                });
                const options = {
                    port: 3333,
                    path: '/api/test',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Content-Length': Buffer.byteLength(message)
                    }
                };
                const req = http.request(options, (res) => {
                    const statusCode = res.statusCode;
                    const contentType = res.headers['content-type'];

                    let error;

                    if (statusCode !== 200) {
                        error = new Error(`Request Failed.\n` +
                            `Status Code: ${statusCode}`);
                    } else if (!/^application\/json/.test(contentType)) {
                        error = new Error(`Invalid content-type.\n` +
                            `Expected application/json but received ${contentType}`);
                    }
                    if (error) {
                        throw error
                    }

                    res.setEncoding('utf8');
                    let rawData = '';
                    res.on('data', (chunk) => rawData += chunk);
                    res.on('end', () => {
                        try {
                            let parsedData = JSON.parse(rawData);
                            if (parsedData.message === 'hi') {
                                done()
                                return;
                            }
                        } catch (e) {
                            throw new Error(`Got error: ${e.message}`);
                        }
                    });
                }).on('error', (e) => {
                    throw new Error(`Got error: ${e.message}`);
                });

                req.write(message);
                req.end();
            })
        });
    });
});