import React, { useCallback, useLayoutEffect } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import { useAxiosRequest } from '../../../Common/Hooks/useAxiosRequest';
import axios from 'axios';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import LoadingComp from '../../../Common/LoadingComponent/LoadingComponent';
import ErrorComp from '../../../Common/ErrorComponent/ErrorComponent';
import { motion } from 'framer-motion';
import { pageTransitionConfig } from '../../../Common/AnimationConfig';


const ArcDiagramVertical = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const { isLoading, isSuccess, axiosFetch, response: data } = useAxiosRequest();
    const dataURL = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json';

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
            const margin = {top: 20, right: 50, bottom: 20, left: 50},
                width = 700 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            const svg = container
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

            // List of node names
            const allNodes = data.nodes.map(d=>d.name)

            // A linear scale to position the nodes on the X axis
            const y = d3.scalePoint()
                        .range([0, height])
                        .domain(allNodes)

            // Add the circle for the nodes
            svg
                .selectAll("mynodes")
                .data(data.nodes)
                .join("circle")
                .attr("cx", 50)
                .attr("cy", d=>y(d.name))
                .attr("r", 8)
                .style("fill", "#69b3a2")

            // And give them a label
            svg
                .selectAll("mylabels")
                .data(data.nodes)
                .join("text")
                .attr("x", 20)
                .attr("y", d=>y(d.name))
                .text(d=>d.name)
                .style("text-anchor", "middle")
                .style("alignment-baseline", "middle")
                .attr('fill', isDarkMode ? '#fff' : '#000');

            const idToNode = {};
                data.nodes.forEach(function (n) {
                idToNode[n.id] = n;
                });

            svg
                .selectAll('mylinks')
                .data(data.links)
                .join('path')
                .attr('d', d=> {
                    let start = y(idToNode[d.source].name)    // X position of start node on the X axis
                    let end = y(idToNode[d.target].name)      // X position of end node
                    return ['M', 50, start,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
                        'A',                            // This means we're gonna build an elliptical arc
                        (start - end)/2*4, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
                        (start - end)/2, 0, 0, ',',
                        start < end ? 1 : 0, 50, ',', end] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
                        .join(' ');
                })
                .style("fill", "none")
                .attr("stroke", isDarkMode ? '#fff' : '#000')

        }          
    }, [isDarkMode, isSuccess, data]);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <motion.div className='arc-chart__wrapper' variants={pageTransitionConfig}
        initial="start"
        animate="animate"
        exit="end">
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Arc diagram vertical</Typography>
            {isLoading && <LoadingComp loadingText={'Fetching data'}/>}
            {(!isLoading && !isSuccess) && <ErrorComp errorText={'Error fetching data'} />}
            <div ref={graphContRef} className='arc-chart__cont'></div>
        </motion.div>
    )
}

export default ArcDiagramVertical;