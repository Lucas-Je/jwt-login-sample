import { useCallback } from 'react';
import Logger from "../utils/Logger";

const useApiError = () => {
    const handleError = useCallback(error => {
        Logger.error("useApiError", error)
        Logger.error("useApiError test", error)
    }, []);

    return { handleError };
};

export default useApiError;
