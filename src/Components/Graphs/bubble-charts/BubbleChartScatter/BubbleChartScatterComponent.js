import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const BubbleChartScatterPlot = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const renderFunc = useCallback(async (container) => {
        const margin = {top: 10, right: 40, bottom: 30, left: 100},
            width = 920 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;  

        const svg = container
            .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);
            
        const data = await d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv");
        const x = d3.scaleLinear()
            .domain([0, 12400])
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .call((d) => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '12px')
            );

        const y = d3.scaleLinear()
            .domain([35, 90])
            .range([ height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y))
            .call((d) => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '12px')
            );

        const z = d3.scaleLinear()
            .domain([200000, 1310000000])
            .range([ 4, 40]);

        const myColor = d3.scaleOrdinal()
            .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
            .range(d3.schemeSet2);

        const tooltip = container
            .append("div")
              .style("opacity", 0)
              .attr("class", "tooltip")
              .style("background-color", isDarkMode ? '#fff' : "#000")
              .style("border-radius", "5px")
              .style("padding", "10px")
              .style("color", isDarkMode ? '#000' : "#fff")

        const showTooltip = function(event, d) {
            tooltip
                .transition()
                .duration(200)
            tooltip
                .style("opacity", 1)
                .html("Country: " + d.country)
                .style("left", (event.x) - (tooltip.node().clientWidth / 2) + "px")
                .style("top", (event.y) + 20 + "px")
                .style('position', 'absolute')
            d3.select(event.target)
                .attr('stroke', isDarkMode ? '#fff' : '#000')
        }
        const moveTooltip = function(event, d) {
            tooltip
              .style("left", (event.x) - (tooltip.node().clientWidth / 2) + "px")
              .style("top", (event.y) + 20 + "px");
            d3.select(event.target)
              .attr('stroke', isDarkMode ? '#fff' : '#000')
        }
        const hideTooltip = function(event, d) {
            tooltip
              .transition()
              .duration(200)
              .style("opacity", 0);
            d3.select(event.target)
              .attr('stroke', isDarkMode ? '#000' : '#fff')
        }

        svg.append('g')
            .selectAll("dot")
            .data(data)
            .join("circle")
            .attr("class", "bubbles")
            .attr("cx", d => x(d.gdpPercap))
            .attr("cy", d => y(d.lifeExp))
            .attr("r", d => z(d.pop))
            .attr('stroke', isDarkMode ? '#000' : '#fff')
            .attr('stroke-width', 2)
            .style("fill", d => myColor(d.continent))
            // -3- Trigger the functions
            .on("mouseover", showTooltip )
            .on("mousemove", moveTooltip )
            .on("mouseleave", hideTooltip )

    }, [isDarkMode]);

    const graphContRef = useD3(renderFunc, [], false);

    return (
        <div className='bubble-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Bubble Chart Scatter Plot</Typography>
            <div ref={graphContRef} className='bubble-chart__cont'></div>
        </div>
    )
}

export default BubbleChartScatterPlot;