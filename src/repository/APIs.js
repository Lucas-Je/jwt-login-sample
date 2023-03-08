import {request} from "../utils/axiosClient";

const url = {
    auth: {
        login: '/api/v1/auth/login',
        reIssueToken: '/api/v1/auth/reissue-token',
    },
};

export const apis = {
    reIssueToken: (data)=> request({url: url.auth.reIssueToken, method: 'post', data}),
    login: (data)=> request({url: url.auth.login, method: 'post', data})
}
