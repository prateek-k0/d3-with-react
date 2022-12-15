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
        const width = container.node().clientWidth, height = 1000;
        const svg = container
            .append("svg")
            .attr("width", '100%')
            .attr("height", height);

        // const path = d3.geoPath();
        const projection = d3.geoNaturalEarth1()
              .scale(width / 5)
              .center([10, 0])
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
        console.log(popData, geoData);
        let mouseOver = function(d) {
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

        let mouseLeave = function(d) {
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
            .on("mouseover", mouseOver )
            .on("mouseleave", mouseLeave )
    }, [isDarkMode]);

    const graphContRef = useD3(renderFunc, null, true);

    return (
        <div className='map__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Choropleth Map</Typography>
            <div ref={graphContRef} className='map__cont'></div>
        </div>
    )
}

export default ChoroplethMap;