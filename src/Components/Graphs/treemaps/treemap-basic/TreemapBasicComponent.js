import React, { useCallback, useLayoutEffect } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import { useAxiosRequest } from '../../../Common/Hooks/useAxiosRequest';
import axios from 'axios';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import LoadingComp from '../../../Common/LoadingComponent/LoadingComponent';
import ErrorComp from '../../../Common/ErrorComponent/ErrorComponent';

const TreemapBasic = () => {
    const { isLoading, isSuccess, axiosFetch, response: data } = useAxiosRequest();
    const dataURL = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json';

    useLayoutEffect(() => {
        axiosFetch({axiosInstance: axios, method: 'get', url: dataURL})
    }, [axiosFetch]);

    useLayoutEffect(() => {
        if(isSuccess && !isLoading) {
            console.log(data);
        }
    }, [data, isSuccess, isLoading]);

    const renderFunc = useCallback((container) => {
        if(isSuccess) {
            const margin = {top: 10, right: 0, bottom: 10, left: 40},
                width = 640 - margin.left - margin.right,
                height = 640 - margin.top - margin.bottom;

            const svg = container
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            const root = d3.hierarchy(data).sum(function(d){ return d.value});

            d3.treemap()
                .size([width, height])
                .paddingTop(28)
                .paddingRight(7)
                .paddingInner(3)      
                (root);

            const color = d3.scaleOrdinal()
                .domain(["boss1", "boss2", "boss3"])
                .range([ "#973ef7", "#D18975", "#63b344"])
            
            // And a opacity scale
            const opacity = d3.scaleLinear()
                .domain([10, 30])
                .range([.5,1])
        
            // use this information to add rectangles:
            svg
                .selectAll("rect")
                .data(root.leaves())
                .join("rect")
                .attr('x', function (d) { return d.x0; })
                .attr('y', function (d) { return d.y0; })
                .attr('width', function (d) { return d.x1 - d.x0; })
                .attr('height', function (d) { return d.y1 - d.y0; })
                .style("stroke", "black")
                .style('stroke-width', 0)
                .style("fill", function(d){ return color(d.parent.data.name)} )
                .style("opacity", function(d){ return opacity(d.data.value)});

            svg
                .selectAll("text")
                .data(root.leaves())
                .enter()
                .append("text")
                .attr("x", function(d){ return d.x0+5})    
                .attr("y", function(d){ return d.y0+20})   
                .text(function(d){ return d.data.name.replace('mister_','') })
                .attr("font-size", "19px")
                .attr("fill", "white");

            svg
                .selectAll("vals")
                .data(root.leaves())
                .enter()
                .append("text")
                .attr("x", function(d){ return d.x0+5})    
                .attr("y", function(d){ return d.y0+35})  
                .text(function(d){ return d.data.value })
                .attr("font-size", "11px")
                .attr("fill", "white");

            svg
                .selectAll("titles")
                .data(root.descendants().filter(function(d){return d.depth === 1}))
                .enter()
                .append("text")
                .attr("x", function(d){ return d.x0})
                .attr("y", function(d){ return d.y0+21})
                .text(function(d){ return d.data.name })
                .attr("font-size", "19px")
                .attr("fill",  function(d){ return color(d.data.name)} )
        }
        
    }, [isSuccess, data]);

    const graphContRef = useD3(renderFunc, null, true);

    return (
        <div className='map__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Treemap Basic</Typography>
            {isLoading && <LoadingComp loadingText={'Fetching data'}/>}
            {(!isLoading && !isSuccess) && <ErrorComp errorText={'Error fetching data'} />}
            <div ref={graphContRef} className='map__cont'></div>
        </div>
    )
}

export default TreemapBasic;