import { useCallback } from 'react';
import Logger from "../utils/Logger";

const useApiError = () => {
    const handleError = useCallback(error => {
        Logger.error("useApiError", error)
    }, []);

    return { handleError };
};

export default useApiError;
