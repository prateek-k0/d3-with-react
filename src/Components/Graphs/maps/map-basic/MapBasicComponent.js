import React, { useCallback, useLayoutEffect } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import { useAxiosRequest } from '../../../Common/Hooks/useAxiosRequest';
import * as d3 from 'd3';
import axios from 'axios';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import LoadingComp from '../../../Common/LoadingComponent/LoadingComponent';
import ErrorComp from '../../../Common/ErrorComponent/ErrorComponent';

const MapBasic = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const { isLoading, isSuccess, axiosFetch, response: mapData } = useAxiosRequest();
    const dataURL = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';

    useLayoutEffect(() => {
        axiosFetch({axiosInstance: axios, method: 'get', url: dataURL})
    }, [axiosFetch]);

    useLayoutEffect(() => {
        if(isSuccess && !isLoading) {
            console.log(mapData);
        }
    }, [mapData, isSuccess, isLoading]);

    const renderFunc = useCallback(async (container) => {
        if(isSuccess) {
            const height = 1000;

            const svg = container
                .append("svg")
                .attr("width", '100%')
                .attr("height", height)
                .append("g");
    
            const width = container.node().clientWidth;
                
            const projection = d3.geoNaturalEarth1()
                .scale(width / 5)
                .translate([width / 2, height / 2]);
    
            const geoData = mapData;
    
            svg.append("g")
            .selectAll("path")
            .data(geoData.features)
            .join("path")
                .attr("fill", "#00bbff")
                .attr("d", d3.geoPath()
                .projection(projection)
                )
                .style("stroke", isDarkMode ? '#000' : '#fff');
        }
    }, [isDarkMode, mapData, isSuccess]);

    const graphContRef = useD3(renderFunc, null, true);

    return (
        <div className='map__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Map Basic</Typography>
            {isLoading && <LoadingComp loadingText={'Fetching data'}/>}
            {(!isLoading && !isSuccess) && <ErrorComp errorText={'Error fetching data'} />}
            <div ref={graphContRef} className='map__cont'></div>
        </div>
    )
}

export default MapBasic;