import bodyParser from 'body-parser';
import Commander from './commander';

const createService = (name, services) => ({ name, services });

const promiseResolve = res => data => res.json(data)
const promiseReject = next => e => next(e);

const handleRoute = commander => (req, res, next) => {
    commander.exec(req.params.service, req.body.action, req.body.payload).then(promiseResolve(res), promiseReject(next)).catch(promiseReject(next));
};

function nameless({ apiPrefix = '', services = []}, app) {
    const commander = Commander(services);
    app.post(`${apiPrefix}/:service`, bodyParser.urlencoded({ extended: false }), bodyParser.json(), handleRoute(commander));

    return { commander, apiPrefix };
}

export default nameless;

export { createService }