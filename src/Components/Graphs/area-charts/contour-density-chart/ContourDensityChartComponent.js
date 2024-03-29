import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import { useAsync } from '../../../Common/Hooks/useAsync';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import LoadingComp from '../../../Common/LoadingComponent/LoadingComponent';
import ErrorComp from '../../../Common/ErrorComponent/ErrorComponent';
import { motion } from 'framer-motion';
import { pageTransitionConfig } from '../../../Common/AnimationConfig';


const ContourDensityChart = () => {
    const getCSVData = useCallback(async () => {
        return d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_for_density2d.csv');
    }, []);

    const { value: data, status } = useAsync(getCSVData, true);

    const renderFunc = useCallback(async (container) => {
        if(status === 'fulfilled') {
            const margin = {top: 50, right: 50, bottom: 50, left: 50},
                width = 600 - margin.left - margin.right,
                height = 600 - margin.top - margin.bottom;

            const svg = container
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            const x = d3.scaleLinear()
                .domain([5, 20])
                .range([ 0, width ]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .call(d => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', 14));

            const y = d3.scaleLinear()
                .domain([5, 22])
                .range([ height, 0 ]);
            svg.append("g")
                .call(d3.axisLeft(y))
                .call(d => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', 14));

            const densityData = d3.contourDensity()
                .x(function(d) { return x(d.x); })   
                .y(function(d) { return y(d.y); })
                .size([width, height])
                .bandwidth(20)
                (data)

            svg
                .selectAll("path")
                .data(densityData)
                .enter()
                .append("path")
                .attr("d", d3.geoPath())
                .attr("fill", "none")
                .attr("stroke", "#69bfdd")
                .attr("stroke-linejoin", "round")
                .attr('stroke-width', 2)
        }
    }, [status, data]);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <motion.div className='area__wrapper' variants={pageTransitionConfig}
        initial="start"
        animate="animate"
        exit="end">
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Contour Density Chart</Typography>
            {(status === 'pending') && <LoadingComp loadingText={'Fetching data'}/>}
            {(status === 'rejected') && <ErrorComp errorText={'Error fetching data'} />}
            <div ref={graphContRef} className='area__cont'></div>
        </motion.div>
    )
}

export default ContourDensityChart;