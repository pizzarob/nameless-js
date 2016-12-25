const createExecuteFn = apiPrefix => (service, action, payload) =>
    typeof window === 'undefined' && typeof global !== 'undefined' && global.nameless instanceof Object ?
        global.nameless.exec(service, action, payload)
        :
        new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('post', `${apiPrefix}/${service}`);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

            xhr.addEventListener('load', () => {
                let { response, status } = xhr;
                let res = JSON.parse(response);
                if(status >= 200 && status < 400){
                    resolve(res);
                } else{
                    reject({ response: res , status });
                }
            });

            xhr.send(JSON.stringify({payload, action}));
        });

function namelessClient(apiPrefix) {
    return {
        exec: createExecuteFn(apiPrefix)
    };
}

export default namelessClient;