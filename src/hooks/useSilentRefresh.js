import {useQuery} from "react-query";
import {apis} from "../repository/APIs";
import {queryKey} from "../constnats/queryKey";

const useSilentRefresh = ({refreshToken}) => {
    useQuery([queryKey.auth.refreshToken, refreshToken], apis.refreshToken(refreshToken), {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 2,
        refetchInterval: 60 * 60 * 1000,// 1hour
        refetchIntervalInBackground: true,
    })
}

export default useSilentRefresh;
