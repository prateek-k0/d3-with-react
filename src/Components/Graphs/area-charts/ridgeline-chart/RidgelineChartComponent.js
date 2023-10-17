import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import { useAsync } from '../../../Common/Hooks/useAsync';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import LoadingComp from '../../../Common/LoadingComponent/LoadingComponent';
import ErrorComp from '../../../Common/ErrorComponent/ErrorComponent';
import { motion } from 'framer-motion';
import { pageTransitionConfig } from '../../../Common/AnimationConfig';


const RidgelineChart = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const getCSVData = useCallback(async () => {
        return d3.csv('https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv');
    }, []);

    const { value: data, status } = useAsync(getCSVData, true);

    const renderFunc = useCallback(async (container) => {
        if(status === 'fulfilled') {
            const margin = {top: 90, right: 30, bottom: 20, left:170},
                width = 1200 - margin.left - margin.right,
                height = 650 - margin.top - margin.bottom;

            const svg = container
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                        `translate(${margin.left}, ${margin.top})`);

            const categories = data.columns
            const n = categories.length

            const y = d3.scaleLinear()
                .domain([0, 0.4])
                .range([ height, 0]);
            
            const x = d3.scaleLinear()
                .domain([-10, 140])
                .range([ 0, width ]);
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x).tickSize(0))
                .call((d) => d.selectAll('text')
                    .attr('font-family', 'Space Mono')
                    .attr('font-size', '14px')
                    .attr('y', 0)
                    .attr('dy', 20)
                );

            const yName = d3.scaleBand()
                .domain(categories)
                .range([0, height])
                .paddingInner(1)
            svg.append("g")
                .call(d3.axisLeft(yName).tickSize(0))
                .call((d) => d.selectAll('text')
                    .attr('font-family', 'Space Mono')
                    .attr('font-size', '14px')
                    .attr('x', 0)
                    .attr('dx', -10)
                );

            function kernelDensityEstimator(kernel, X) {
                return function(V) {
                    return X.map(function(x) {
                    return [x, d3.mean(V, function(v) { return kernel(x - v); })];
                    });
                };
            }
            function kernelEpanechnikov(k) {
                return function(v) {
                    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
                };
            }

            const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
            const allDensity = []
            for (let i = 0; i < n; i++) {
                let key = categories[i]
                let density = kde( data.map(function(d){  return d[key]; }) )
                allDensity.push({key: key, density: density})
            }

            svg.selectAll("areas")
                .data(allDensity)
                .join("path")
                .attr("transform", function(d){return(`translate(0, ${(yName(d.key)-height)})`)})
                .datum(function(d){return(d.density)})
                .attr("fill", "#69b3aa")
                .attr("stroke", isDarkMode ? '#fff' : '#000')
                .attr("stroke-width", 0.5)
                .attr("d",  d3.line()
                    .curve(d3.curveBasis)
                    .x(function(d) { return x(d[0]); })
                    .y(function(d) { return y(d[1]); })
                )
        }
    }, [isDarkMode, status, data]);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <motion.div className='area-chart__wrapper' variants={pageTransitionConfig}
        initial="start"
        animate="animate"
        exit="end">
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Ridgeline Chart</Typography>
            {(status === 'pending') && <LoadingComp loadingText={'Fetching data'}/>}
            {(status === 'rejected') && <ErrorComp errorText={'Error fetching data'} />}
            <div ref={graphContRef} className='area-chart__cont' ></div>
        </motion.div>
    )
}

export default RidgelineChart;