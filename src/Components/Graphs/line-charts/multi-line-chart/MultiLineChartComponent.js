import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';

const MultiLineChart = () => {

    const renderFunc = useCallback(async (container) => {
        const margin = {top: 10, right: 0, bottom: 30, left: 70},
            width = 920 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        const svg = container
            .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);

        const data = await d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv");

        const sumstat = d3.group(data, d => d.name);

        const x = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.year; }))
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).ticks(5))
            .call((d) => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '14px')
            );

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d.n; })])
            .range([ height, 0 ]);
          svg.append("g")
            .call(d3.axisLeft(y))
            .call((d) => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '14px')
            );

        const color = d3.scaleOrdinal()
            .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffab03','#a65628','#f781bf','#999999']);

        svg.selectAll(".line")
            .data(sumstat)
            .join("path")
              .attr("fill", "none")
              .attr("stroke", function(d){ return color(d[0]) })
              .attr("stroke-width", 1.5)
              .attr("d", function(d){
                return d3.line()
                  .x(function(d) { return x(d.year); })
                  .y(function(d) { return y(+d.n); })
                  (d[1])
              })
      
    }, []);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <div className='line-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Multi Line Chart</Typography>
            <div ref={graphContRef} className='line-chart__cont' ></div>
        </div>
    )
}

export default MultiLineChart;