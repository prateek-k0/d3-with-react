import { useState, useLayoutEffect, useCallback } from 'react';

const useAsync = (callback, immediate = true) => {
    const [status, setStatus] = useState('idle');
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    const execute = useCallback(() => {
        setStatus('pending');
        setValue(null);
        setError(null);
        callback()
            ?.then((result) => {
                setValue(result);
                setStatus('fulfilled');
            })?.catch((err) => {
                setError(err);
                setStatus('rejected');
            });
    }, [callback]);

    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as in an onClick handler.
    useLayoutEffect(() => {
        immediate && execute();
    }, [execute, immediate]);

    return { execute, status, value, error }
}

export { useAsync };