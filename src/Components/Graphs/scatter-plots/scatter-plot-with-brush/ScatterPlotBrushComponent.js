import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const ScatterPlotBrush = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const renderFunc = useCallback(async (container) => {
        var margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 840 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        
        var svg = container
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 
          
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
            .range([ "#c507f5ff", "#21908dff", "#fde725ff"]);

        var myCircle = svg.append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
              .attr("cx", function (d) { return x(d.Sepal_Length); } )
              .attr("cy", function (d) { return y(d.Petal_Length); } )
              .attr("r", 8)
              .style("fill", function (d) { return color(d.Species) } )
              .style("opacity", 0.5);
        // Add brushing
        svg
            .call(
                d3.brush()                 // Add the brush feature using the d3.brush function
                .extent([[0,0], [width,height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
                .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
            );

        // Function that is triggered when brushing is performed
        function updateChart(event) {
            let extent = event.selection
            myCircle.classed("selected", function(d){ return isBrushed(extent, x(d.Sepal_Length), y(d.Petal_Length) ) } )
            svg.selectAll('circle.selected')
            .style('opacity', 1)
            .attr('stroke', isDarkMode ? '#fff' : '#000')
            .attr('stroke-width', 1)

            svg.selectAll('circle:not(.selected)')
            .style('opacity', 0.5)
            .attr('stroke', isDarkMode ? '#fff' : '#000')
            .attr('stroke-width', 0)
        }

        // A function that return TRUE or FALSE according if a dot is in the selection or not
        function isBrushed(brush_coords, cx, cy) {
            var x0 = brush_coords[0][0],
                x1 = brush_coords[1][0],
                y0 = brush_coords[0][1],
                y1 = brush_coords[1][1];
            return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
        }
        
    }, [isDarkMode]);

    const graphContRef = useD3(renderFunc, [], false);

    return (
        <div className='scatter-plot__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Scatter plot with brush</Typography>
            <div ref={graphContRef} className='scatter-plot__cont'></div>
        </div>
    )
}

export default ScatterPlotBrush;