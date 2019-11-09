import axios from 'axios';
import { Loading, Message } from 'element-ui'

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        if (error.response.status === 400) {
            if (error.response.data && error.response.data.error_description && error.response.data.error_description === 'Bad credentials') {
                return Promise.reject(error)
            } else {
                Message.error(error.response.data.error_description)
            }
            // return Promise.reject(error)
        } else if (error.response.status === 500) {
            if (error.response.data.error === 'Internal Server Error') {
                Message.error(error.response.data.message)
            } else if (error.response.data.error === 'Unknown Error') {
                Message.error(error.response.data.cause)
            } else {
                Message.error(error.response.data.error)
            }
            return Promise.reject(error)
        } else {
            return Promise.reject(error)
        }
    }
);

export default{
    install (Vue) {
        Vue.prototype.getServer = (url, param, successFun, errorFun) => {
            Vue.prototype.http('get', url, param, successFun, errorFun)
        }

        Vue.prototype.postServer = (url, param, successFun, errorFun) => {
            Vue.prototype.http('post', url, param, successFun, errorFun)
        }

        Vue.prototype.deleteServer = (url, param, successFun, errorFun) => {
            Vue.prototype.http('delete', url, param, successFun, errorFun)
        }

        Vue.prototype.putServer = (url, param, successFun, errorFun) => {
            Vue.prototype.http('put', url, param, successFun, errorFun)
        }

        // Vue.prototype.export = (url, param, successFun, errorFun) => {
        //     let token = store.getters['token']
        //     let machineCode = store.getters['machineCode']
        //     let header = {
        //         'Authorization': 'Bearer ' + token
        //     }
        //     if (machineCode) {
        //         header.machineCode = machineCode
        //     }
        //     HTTP({
        //         method: 'post',
        //         url: url,
        //         data: param,
        //         dataType: 'json',
        //         headers: header,
        //         contentType: 'application/json',
        //         responseType: 'blob'
        //     }).then(successFun)
        //         .catch(errorFun)
        // }
        Vue.prototype.http = (method, url, param, successFun, errorFun) => {
            service({
                method: method,
                url: url,
                data: param,
                dataType: 'json',
                // headers: headers,
                contentType: 'application/json'
            }).then(successFun)
                .catch(errorFun)
        }
    }
}