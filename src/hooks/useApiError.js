import { useCallback } from 'react';

const useApiError = () => {
    const handleError = useCallback(error => {
        console.error(error);
    }, []);

    return { handleError };
};

export default useApiError;
