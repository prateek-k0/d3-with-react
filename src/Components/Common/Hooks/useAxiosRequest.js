import { useState, useEffect, useCallback } from 'react';

const useAxiosRequest = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [controller, setController] = useState(null);     // to abort currently fetching request on re-render

    const axiosFetch = useCallback(async (configObj) => {
        const {
            axiosInstance,
            method,
            url,
            requestConfig = {}
        } = configObj;

        try {
            setIsLoading(true);
            const controllerInstance = new AbortController();
            setController(controllerInstance);
            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig,
                signal: controllerInstance.signal
            });
            setResponse(res.data);
            setIsSuccess(true);
        } catch(err) {
            setError(err);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        // console.log(controller);

        // abort on re-render / unmount
        // stale enclosure for 'controller' value, on changing 'controller', 
        // cleanup will use its previous value to abort
        return () => { controller && controller.abort(); }
    }, [controller]);

    return { response, error, isLoading, isSuccess, axiosFetch };
}

export { useAxiosRequest };