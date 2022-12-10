import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';

const LineChartMultipleInputs = () => {

    const renderFunc = useCallback(async (container) => {
        const margin = {top: 10, right: 50, bottom: 30, left: 50},
            width = 800 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        const svg = container
            .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);

        const data = await d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_connectedscatter.csv");

        const allGroup = ["valueA", "valueB", "valueC"];

        d3.select("#selectButton").selectAll('option').remove();

        d3.select("#selectButton")
            .selectAll('myOptions')
            .data(allGroup)
            .enter()
            .append('option')
            .text(function (d) { return d; }) // text showed in the menu
            .attr("value", function (d) { return d; }) // corresponding value returned by the button

        const myColor = d3.scaleOrdinal()
            .domain(allGroup)
            .range(d3.schemeSet2);
      
         // Add X axis --> it is a date format
        const x = d3.scaleLinear()
            .domain([0,10])
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .call((d) => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '14px')
            );

        const y = d3.scaleLinear()
            .domain( [0,20])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y))
            .call((d) => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '14px')
            );

        const line = svg
            .append('g')
            .append("path")
              .datum(data)
              .attr("d", d3.line()
                .x(function(d) { return x(+d.time) })
                .y(function(d) { return y(+d.valueA) })
              )
              .attr("stroke", function(d){ return myColor("valueA") })
              .style("stroke-width", 4)
              .style("fill", "none");

        function update(selectedGroup) {

            const dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })
            line
                .datum(dataFilter)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .x(function(d) { return x(+d.time) })
                    .y(function(d) { return y(+d.value) })
                )
                .attr("stroke", function(d){ return myColor(selectedGroup) })
              }
              d3.select("#selectButton").on("change", function(event,d) {
                  const selectedOption = d3.select(this).property("value")
                  update(selectedOption)
              });

    }, []);

    const graphContRef = useD3(renderFunc, [], false);

    return (
        <div className='line-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Line chart with multiple inputs</Typography>
            <select style={{margin: '0 20px 40px'}} id="selectButton"></select>
            <div ref={graphContRef} className='line-chart__cont' ></div>
        </div>
    )
}

export default LineChartMultipleInputs;