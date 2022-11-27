import { useLayoutEffect, useRef } from 'react';

const useGetResizeableElementRef = (callback) => {
    const targetRef = useRef();

    useLayoutEffect(() => {     
        if(targetRef.current) {
            const target = targetRef.current;
            const observerInstsnce = new ResizeObserver((entries) => {
                entries.forEach((entry) => {
                    callback(entry);
                });
            });
            observerInstsnce.observe(target);

            return () => { observerInstsnce.unobserve(target); }
        }
    }, [callback]);
    return targetRef;
}

export { useGetResizeableElementRef };
