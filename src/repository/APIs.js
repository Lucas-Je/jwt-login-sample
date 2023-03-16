import {request} from "../utils/axiosClient";

const url = {
    auth: {
        login: '/api/v1/auth/signin',
        refreshToken: '/api/v1/auth/refresh',
        refreshToken3: '/api/v1/auth/refresh3',
    },
};

export const apis = {
    refreshToken: (data)=> request({url: url.auth.refreshToken, method: 'post', data}),
    login: (data)=> request({url: url.auth.login, method: 'post', data})
}
