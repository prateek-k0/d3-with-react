import { useLayoutEffect, useState, useCallback } from 'react';
import { useGetResizeableElementRef } from "./useGetResizeableElementRef";
import * as d3 from 'd3';

export const useD3 = ((renderFunc, dependencies, resizable = true) => {
    const [refWidth, setRefWidth] = useState(0);

    const resizerCallback = useCallback((entry) => {
        if(resizable === true && refWidth !== entry.contentRect.width)
            setRefWidth(entry.contentRect.width); 
    }, [resizable, refWidth]);

    const ref = useGetResizeableElementRef(resizerCallback);

    useLayoutEffect(() => {
        const containerElement = ref.current;
        renderFunc(d3.select(containerElement));
       
        return () => {
            // cleanup function 
            containerElement.innerHTML = '';
        };
    }, [ref, renderFunc, ...dependencies, refWidth]);

    return ref;
});