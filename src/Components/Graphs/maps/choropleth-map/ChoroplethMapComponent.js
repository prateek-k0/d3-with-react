import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const ChoroplethMap = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const renderFunc = useCallback(async (container) => {
        const width = container.node().clientWidth, height = 1500;
        const svg = container
            .append("svg")
            .attr("width", '100%')
            .attr("height", height);

        // const path = d3.geoPath();
        const projection = d3.geoMercator()
              .scale(width / 7)
              .center([0, 0])
              .rotate([-12, 0])
              .translate([width / 2, height / 2]);

        const colorScale = d3.scaleThreshold()
            .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
            .range(d3.schemeBlues[7]);

        const data = new Map();

        const geoData = await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
        const popData = await d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv");
        popData.forEach((d) => {
            data.set(d.code, +d.pop);
        });

        const tooltip = container
            .append("div")
            .style('display', 'none')
            .attr("class", "tooltip")
            .style("background-color", isDarkMode ? '#000' : '#fff')
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style('position', 'absolute')
            .style('color', isDarkMode ? '#fff' : '#000');

        let mouseOver = function(event) {
            tooltip
                .style('display', 'block')
            d3.selectAll(".Country")
                .transition()
                .duration(300)
                .style("opacity", 0.5)
            d3.select(this)
                .transition()
                .duration(0)
                .style("opacity", 1)
                .style("stroke", isDarkMode ? '#fff' : '#000')
        }

        let mouseMove = function(event, d) {
            tooltip
                .html(d.properties.name + ":<br />" + data.get(d.id) || 0)
                .style("left", ((event.x) - (tooltip.node().clientWidth / 2)) + "px")
                .style("top", (event.y) + 20 + "px")
        }

        let mouseLeave = function(d) {
            tooltip
                .style('display', 'none')
            d3.selectAll(".Country")
                .transition()
                .duration(0)
                .style("opacity", 1)
            d3.select(this)
                .transition()
                .duration(0)
                .style("stroke", "transparent")
        }

        svg.append("g")
            .selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            // draw each country
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            // set the color of each country
            .attr("fill", function (d) {
                d.total = data.get(d.id) || 0;
                return colorScale(d.total);
            })
            .style("stroke", "transparent")
            .attr("class", function(d){ return "Country" } )
            .style("opacity", 1)
            .on("mouseover", mouseOver)
            .on("mousemove", mouseMove)
            .on("mouseleave", mouseLeave);

    }, [isDarkMode]);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <div className='map__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Choropleth Map</Typography>
            <Typography sx={{fontSize: '22px', padding: '20px', textAlign: 'center', fontWeight: '300', fontFamily: 'system-ui'}}>Country-wise population data (2004)</Typography>
            <div ref={graphContRef} className='map__cont' style={{padding: '0 0'}}></div>
        </div>
    )
}

export default ChoroplethMap;