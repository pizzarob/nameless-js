import bodyParser from 'body-parser';
import Commander from './commander';

const createService = (name, services) => ({ name, services });

const promiseResolve = res => data => res.json(data)
const promiseReject = res => e => res.status(e.code || 500).send({
    message: e.message || 'error',
    statusCode: e.code || 500,
});

const handleRoute = commander => (req, res, next) => {
    commander.exec(req.params.service, req.body.action, req.body.payload, req, res, next).then(promiseResolve(res), promiseReject(res)).catch(promiseReject(res));
};

function nameless({ apiPrefix = '', services = []}, app) {
    const commander = Commander(services);
    app.post(`${apiPrefix}/:service`, bodyParser.urlencoded({ extended: false }), bodyParser.json(), handleRoute(commander));

    global.nameless = {
        exec: commander.exec
    };

    return { commander, apiPrefix };
}

export default nameless;

export { createService }
