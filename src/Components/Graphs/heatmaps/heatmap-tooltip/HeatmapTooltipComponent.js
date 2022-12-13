import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const HeatmapWithTooltip = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const renderFunc = useCallback(async (container) => {
        const margin = {top: 50, right: 50, bottom: 50, left: 50},
            width = 600 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
        const svg = container
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const data = await d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv");
        
        const myGroups = Array.from(new Set(data.map(d => d.group)))
        const myVars = Array.from(new Set(data.map(d => d.variable)))

        // Build X scales and axis:
        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(myGroups)
            .padding(0.05);
        svg.append("g")
            .style("font-size", 15)
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSize(0))
            .select(".domain").remove()

        // Build Y scales and axis:
        const y = d3.scaleBand()
            .range([ height, 0 ])
            .domain(myVars)
            .padding(0.05);
        svg.append("g")
            .style("font-size", 15)
            .call(d3.axisLeft(y).tickSize(0))
            .select(".domain").remove()

         // Build color scale
        const myColor = d3.scaleSequential()
            .interpolator(d3.interpolatePlasma)
            .domain([1,100])

        // create a tooltip
        const tooltip = container
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", isDarkMode ? '#000' : '#fff')
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style('position', 'absolute')
            .style('color', isDarkMode ? '#fff' : '#000');


        const mouseover = function(event,d) {
            tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", isDarkMode ? '#fff' : '#000')
                .style("opacity", 1)
        }
        const mousemove = function(event,d) {
            tooltip
                .html("The exact value of<br>this cell is: " + d.value)
                .style("left", (event.x) / 2 + "px")
                .style("top", (event.y) + 10 + "px")
        }
        const mouseleave = function(event,d) {
            tooltip
                .style("opacity", 0)
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 0.8)
        }

        // add the squares
        svg.selectAll()
        .data(data, function(d) {return d.group+':'+d.variable;})
        .join("rect")
            .attr("x", function(d) { return x(d.group) })
            .attr("y", function(d) { return y(d.variable) })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", function(d) { return myColor(d.value)} )
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    }, [isDarkMode]);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <div className='heatmap__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Heatmap with Tooltip</Typography>
            <div ref={graphContRef} className='heatmap__cont'></div>
        </div>
    )
}

export default HeatmapWithTooltip;