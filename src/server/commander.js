const createActionFunc = fn => (payload) => new Promise((resolve, reject) => {
    fn(payload, resolve, reject);
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

    function execute(service, action, payload) {
        try {
            return obj[service][action](payload);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    return {
        exec: execute
    }
}

export default commander;