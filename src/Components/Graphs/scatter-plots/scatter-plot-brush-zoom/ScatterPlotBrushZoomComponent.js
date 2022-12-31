import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import { useAsync } from '../../../Common/Hooks/useAsync';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import LoadingComp from '../../../Common/LoadingComponent/LoadingComponent';
import ErrorComp from '../../../Common/ErrorComponent/ErrorComponent';

const ScatterPlotBrushZoom = () => {
    const getCSVData = useCallback(async () => {
        return d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv');
    }, []);

    const { value: data, status } = useAsync(getCSVData, true);

    const renderFunc = useCallback(async (container) => {
        if(status === 'fulfilled') {
            var margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 800 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            var Svg = container
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            // Add X axis
            var x = d3.scaleLinear()
            .domain([4, 8])
            .range([ 0, width ]);
            var xAxis = Svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .call((d) => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '12px'));

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, 9])
                .range([ height, 0]);
            Svg.append("g")
                .call(d3.axisLeft(y))
                .call((d) => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '12px'));

            // Add a clipPath: everything out of this area won't be drawn.
            Svg.append("defs").append("svg:clipPath")
                .attr("id", "clip")
                .append("svg:rect")
                .attr("width", width )
                .attr("height", height )
                .attr("x", 0)
                .attr("y", 0);

            var color = d3.scaleOrdinal()
                .domain(["setosa", "versicolor", "virginica" ])
                .range([ "#c507f5ff", "#21908dff", "#fde725ff"])

            // Add brushing
            var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
                .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
                .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

            // Create the scatter variable: where both the circles and the brush take place
            var scatter = Svg.append('g')
                .attr("clip-path", "url(#clip)");

            scatter
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function (d) { return x(d.Sepal_Length); } )
                .attr("cy", function (d) { return y(d.Petal_Length); } )
                .attr("r", 8)
                .style("fill", function (d) { return color(d.Species) } )
                .style("opacity", 0.5);

            // Add the brushing
            scatter
                .append("g")
                .attr("class", "brush")
                .call(brush);

            let idleTimeout
            function idled() { idleTimeout = null; }

            function updateChart(event) {
                let extent = event.selection
            
                // If no selection, back to initial coordinate. Otherwise, update X axis domain
                if(!extent) {
                    if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                    x.domain([4,8])
                } else {
                    x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
                    scatter.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
                }
                // Update axis and circle position
                xAxis.transition().duration(1000).call(d3.axisBottom(x))
                scatter
                .selectAll("circle")
                .transition().duration(1000)
                .attr("cx", function (d) { return x(d.Sepal_Length); } )
                .attr("cy", function (d) { return y(d.Petal_Length); } )
            }
        }
    }, [status, data]);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <div className='scatter-plot__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Scatter plot with brush zoom</Typography>
            {(status === 'pending') && <LoadingComp loadingText={'Fetching data'}/>}
            {(status === 'rejected') && <ErrorComp errorText={'Error fetching data'} />}
            <div ref={graphContRef} className='scatter-plot__cont'></div>
        </div>
    )
}

export default ScatterPlotBrushZoom;