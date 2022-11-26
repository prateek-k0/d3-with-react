import { useLayoutEffect, useRef } from 'react';

const useGetResizeableElementRef = (callback) => {
    const targetRef = useRef();

    useLayoutEffect(() => {     
        if(targetRef.current) {
            const target = targetRef.current;
            const resObs = new ResizeObserver((entries) => {
                entries.forEach((entry) => {
                    callback(entry);
                })
            });
            resObs.observe(target);

            return () => { resObs.unobserve(target); }
        }
    }, [callback]);
    return targetRef;
}

export { useGetResizeableElementRef };
