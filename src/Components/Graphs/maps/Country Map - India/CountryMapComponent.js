import React, { useCallback, useLayoutEffect } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import { useAxiosRequest } from '../../../Common/Hooks/useAxiosRequest';
import * as d3 from 'd3';
import axios from 'axios';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import IndianStatesGeoJsonData from './Indian_States.json';
import LoadingComp from '../../../Common/LoadingComponent/LoadingComponent';
import ErrorComp from '../../../Common/ErrorComponent/ErrorComponent';

const CountryMapIndia = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);
    // const statesDataURL = 'https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States';
    const districtsDataURL = 'https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson';
    const { isSuccess, response: geoDistrictsData, axiosFetch, isLoading } = useAxiosRequest();

    useLayoutEffect(() => {
        if(isSuccess && !isLoading) {
            console.log(geoDistrictsData);
        }
    }, [geoDistrictsData, isSuccess, isLoading]);

    useLayoutEffect(() => {
        axiosFetch({axiosInstance: axios, method: 'get', url: districtsDataURL})
    }, [axiosFetch]);

    const renderFunc = useCallback(async (container) => {

        if(!isLoading && isSuccess) {
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

            const geoStatesData = IndianStatesGeoJsonData;
    
            const districtPaths = svg.append("g")
                .attr('class', 'districtwise-boundary')
                .selectAll("path")
                .data(geoDistrictsData.features)
                .join("path")
                .attr("fill", "#00bbff")
                .attr("d", d3.geoPath().projection(projection))
                .style("stroke", isDarkMode ? '#000' : '#fff')
                .style('stroke-width', 0.1);
    
            svg.append("g")
                .attr('class', 'statewise-boundary')
                .selectAll("path")
                .data(geoStatesData.features)
                .join("path")
                .attr("fill", "transparent")
                .attr("d", d3.geoPath().projection(projection))
                .style("stroke", isDarkMode ? '#000' : '#fff')
                .style('stroke-width', 1)
                .on('mouseover', (event, stateData) => {
                    d3.select(event.target)
                        .style("stroke", '#fac802')
                        .style('stroke-width', 2)
                        .raise();
                    // console.log(stateData);
                    districtPaths.filter((d) => d.properties.NAME_1 === stateData.properties.NAME_1)
                        .style("stroke", '#fac802')
                        .style('stroke-width', 0.67);
                }).on('mouseleave', (event) => {
                    d3.select(event.target)
                        .style("stroke", isDarkMode ? '#000' : '#fff')
                        .style('stroke-width', 1)
                    districtPaths
                        .style("stroke", isDarkMode ? '#000' : '#fff')
                        .style('stroke-width', 0.1);
                });
        }

    }, [isDarkMode, isLoading, isSuccess, geoDistrictsData]);

    const graphContRef = useD3(renderFunc, null, true);

    return (
        <div className='map__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Country Map - India</Typography>
            {isLoading && <LoadingComp loadingText={'Fetching data'}/>}
            {(!isLoading && !isSuccess) && <ErrorComp errorText={'Error fetching data'} />}
            <div ref={graphContRef} className='map__cont'></div>
        </div>
    )
}

export default CountryMapIndia;