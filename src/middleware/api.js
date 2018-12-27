import superagent from 'superagent';
import config from '../config/config';

const endpointLocation = 'remote';

const urls = {
    remote: {
        'user': '/search/users',
        'count-repo': '/search/repositories',
    }
}

function handleAPISuccess(res, resolve) {
    resolve(res);
}

function handleAPIError(error, reject) {

    return reject(error);
}

function callApiAfterTokenValidation(endpoint, query = {}, method, data = {}) {
    let _reject;
    let _request;

    const url = config.api.host + endpoint;
    
    let headers = new Headers();
    headers.append("Authorization", "token 46c0a306b5323c67148ef8c18482c53f0bc8065f");
    // headers.append("Content-Type", "application/json"); 

    const promise = new Promise((resolve, reject) => {
        _reject = reject;
        
        _request = superagent[method.toLowerCase()](url)
            .query(query)
            .send(data)
            // .set({"Authorization": "token 46c0a306b5323c67148ef8c18482c53f0bc8065f"})
            .end((error, res) => {
                if (error) {
                    handleAPIError(error, reject);
                } else {
                    handleAPISuccess(res, resolve);
                }
            });
    });

    promise.abort = function abort() {
        _request.abort();
        _reject();
    };
    return promise;
}

function callApi(endpoint, query = {}, method , data = {}) {
    return callApiAfterTokenValidation(endpoint, query, method, data);
}

function getEndpoint(endpoint) {
    return urls[endpointLocation][endpoint];
}

export function getUser(params) {
    return callApi(getEndpoint('user'), params, 'GET', null);
}

export function getCountRepo(params) {
    return callApi(getEndpoint('count-repo'), params, 'GET', null);
}
