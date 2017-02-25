const createActionFunc = fn => (payload, req, res) => new Promise((resolve, reject) => {
    fn(payload, resolve, reject, req, res);
});


function commander(services = []) {

    const obj = {};

    services.forEach(service => {
        if (!obj[service.name]) {
            obj[service.name] = {};
        }

        Object.keys(service.services).forEach(action => {
            obj[service.name][action] = createActionFunc(service.services[action]);
        });

    });

    function execute(service, action, payload, req, res) {
        try {
            return obj[service][action](payload, req, res);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    return {
        exec: execute
    }
}

export default commander;
