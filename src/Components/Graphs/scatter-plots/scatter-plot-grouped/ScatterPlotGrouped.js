import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';

const ScatterPlotGrouped = () => {

    const renderFunc = useCallback(async (container) => {
        var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = container
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        const data = await d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv");

        // Add X axis
        var x = d3.scaleLinear()
        .domain([4, 8])
        .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .call((d) => d.selectAll('text')
            .attr('font-family', 'Space Mono')
            .attr('font-size', '12px'));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 9])
            .range([ height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y))
            .call((d) => d.selectAll('text')
            .attr('font-family', 'Space Mono')
            .attr('font-size', '12px'));

        var color = d3.scaleOrdinal()
            .domain(["setosa", "versicolor", "virginica" ])
            .range([ "#c507f5ff", "#21908dff", "#fde725ff"])

        const highlight = function(event,d){
            let selected_specie = d.Species
            d3.selectAll(".dot")
                  .transition()
                  .duration(200)
                  .style("fill", "lightgrey")
                  .attr("r", 3)
            d3.selectAll("." + selected_specie)
                  .transition()
                  .duration(200)
                  .style("fill", color(selected_specie))
                  .attr("r", 7)
        }

        const doNotHighlight = function(event,d){
            d3.selectAll(".dot")
              .transition()
              .duration(200)
              .style("fill", d => color(d.Species))
              .attr("r", 5 )
        }

        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", function (d) { return "dot " + d.Species } )
            .attr("cx", function (d) { return x(d.Sepal_Length); } )
            .attr("cy", function (d) { return y(d.Petal_Length); } )
            .attr("r", 5)
            .style("fill", function (d) { return color(d.Species) } )
            .on("mouseover", highlight)
            .on("mouseleave", doNotHighlight )
            
    }, []);

    const graphContRef = useD3(renderFunc, [], false);

    return (
        <div className='scatter-plot__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Scatter plot Grouped</Typography>
            <div ref={graphContRef} className='scatter-plot__cont'></div>
        </div>
    )
}

export default ScatterPlotGrouped;