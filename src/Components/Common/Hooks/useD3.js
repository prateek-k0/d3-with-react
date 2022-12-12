import { useLayoutEffect, useState, useCallback } from 'react';
import { useGetResizeableElementRef } from "./useGetResizeableElementRef";
import * as d3 from 'd3';

export const useD3 = ((renderFunc, dependencies, resizeable = true, onCleanup = undefined) => {
    const [refWidth, setRefWidth] = useState(0);

    const resizerCallback = useCallback((entry) => {
        if(resizeable === true && refWidth !== entry.contentRect.width)
            setRefWidth(entry.contentRect.width); 
    }, [resizeable, refWidth]);

    const ref = useGetResizeableElementRef(resizerCallback);

    const resizeableDep = resizeable ? refWidth : null;

    useLayoutEffect(() => {
        const containerElement = ref.current;
        renderFunc(d3.select(containerElement));
       
        // return cleanup function
        return () => {
            // onCleanup callback
            onCleanup && onCleanup();
            // remove inner content when this function is run
            containerElement.innerHTML = '';
        };
    }, [ref, renderFunc, dependencies, onCleanup, resizeableDep]);

    return ref;
});