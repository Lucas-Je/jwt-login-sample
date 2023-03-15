import { useMutation, useQueryClient } from 'react-query';
import {apis} from "../repository/APIs";
import useSilentRefresh from "./useSilentRefresh";
import {removeCookie, setCookie} from "../utils/cookie";
import {COOKIES} from "../constnats/login";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {authAtom} from "../state/auth";
import Logger from "../utils/Logger";
export const useLogin = queryKey => {
    const setAuth = useSetRecoilState(authAtom);
    const resetAuth = useResetRecoilState(authAtom);
    const queryClient = useQueryClient();
    const silentRefresh = useSilentRefresh;
    const login = async loginInfo => {
        Logger.error("useLogin", loginInfo)
        return apis.login(loginInfo)
    };

    return useMutation(login, {
        onSuccess: async data => {
            const {token} = data;
            if (data.status === 200) {
                await queryClient.invalidateQueries(queryKey);
                setCookie(COOKIES.REFRESH_TOKEN, { content: token.refreshToken, expires: token.refreshTokenExpiresAt });
                setAuth({ authenticated: true, accessToken: token.accessToken, expires: token.accessTokenExpiresAt });
                silentRefresh({refreshToken: data.data.token.refreshToken})
            } else {
                throw new Error(JSON.stringify(data));
            }
        },

        onError: (error, variable, context) => {
            Logger.log('onError', error.message)
        },
        onSettled: () => {},
    });
};
