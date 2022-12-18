import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import IndiaGeoJsonData from './Indian_States.json';

const CountryMapIndia = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const renderFunc = useCallback((container) => {
        const height = 1000;
        const svg = container
            .append("svg")
            .attr("width", '100%')
            .attr("height", height)
            .append("g");
        const width = container.node().clientWidth;
            
        const projection = d3.geoMercator()
            .scale(width)
            .translate([-width, 1150]);
        const geoData = IndiaGeoJsonData;

        svg.append("g")
            .selectAll("path")
            .data(geoData.features)
            .join("path")
            .attr("fill", "#00bbff")
            .attr("d", d3.geoPath().projection(projection))
            .style("stroke", isDarkMode ? '#000' : '#fff');

    }, [isDarkMode]);

    const graphContRef = useD3(renderFunc, null, true);

    return (
        <div className='map__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Country Map - India</Typography>
            <div ref={graphContRef} className='map__cont'></div>
        </div>
    )
}

export default CountryMapIndia;