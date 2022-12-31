import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import { useAsync } from '../../../Common/Hooks/useAsync';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import LoadingComp from '../../../Common/LoadingComponent/LoadingComponent';
import ErrorComp from '../../../Common/ErrorComponent/ErrorComponent';

const LineChartBrushed = () => {
    const getCSVData = useCallback(async () => {
        return d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv');
    }, []);

    const { value: csvData, status } = useAsync(getCSVData, true);

    const renderFunc = useCallback(async (container) => {
        if(status === 'fulfilled') {
            const margin = {top: 10, right: 0, bottom: 30, left: 70},
            width = 920 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

            const svg = container
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            let data = csvData
            
            data = data.map((d) => ({ date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }));

            const x = d3.scaleTime()
                .domain(d3.extent(data, function(d) { return d.date; }))
                .range([ 0, width ]);
            let xAxis = svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x).tickSizeOuter(0))
                .call((d) => d.selectAll('.tick')
                    .attr('font-family', 'Space Mono')
                    .attr('font-size', '14px')
                );

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return +d.value; })])
                .range([ height, 0 ]);
            svg.append("g")
                .call(d3.axisLeft(y).tickSizeOuter(0))
                .call((d) => d.selectAll('text')
                    .attr('font-family', 'Space Mono')
                    .attr('font-size', '14px')
                );

            // Add a clipPath: everything out of this area won't be drawn.
            svg.append("defs").append("svg:clipPath")
                .attr("id", "clip")
                .append("svg:rect")
                .attr("width", width )
                .attr("height", height )
                .attr("x", 0)
                .attr("y", 0);

            // Add brushing
            var brush = d3.brushX()                   // Add the brush feature using the d3.brush function
                .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
                .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function

            // Create the line variable: where both the line and the brush take place
            var line = svg.append('g')
                .attr("clip-path", "url(#clip)")

            // Add the line
            line.append("path")
                .datum(data)
                .attr("class", "line")  // I add the class line to be able to modify this line later on.
                .attr("fill", "none")
                .attr("stroke", "#038aff")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(function(d) { return x(d.date) })
                    .y(function(d) { return y(d.value) })
                );

            line
                .append("g")
                .attr("class", "brush")
                .call(brush);

                // A function that set idleTimeOut to null
            var idleTimeout
            function idled() { idleTimeout = null; }

            function updateChart(event) {

                // What are the selected boundaries?
                let extent = event.selection
        
                // If no selection, back to initial coordinate. Otherwise, update X axis domain
                if(!extent) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                x.domain([ 4,8])
                } else {
                x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
                line.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
                }
        
                // Update axis and line position
                xAxis.transition().duration(1000).call(d3.axisBottom(x))
                .call((d) => d.selectAll('.tick')
                    .attr('font-family', 'Space Mono')
                    .attr('font-size', '14px')
                );
                line
                    .select('.line')
                    .transition()
                    .duration(1000)
                    .attr("d", d3.line()
                    .x(function(d) { return x(d.date) })
                    .y(function(d) { return y(d.value) })
                    )
            }
        
            // If user double click, reinitialize the chart
            svg.on("dblclick",function(){
                x.domain(d3.extent(data, function(d) { return d.date; }))
                xAxis.transition().call(d3.axisBottom(x))
                    .call((d) => d.selectAll('.tick')
                    .attr('font-family', 'Space Mono')
                    .attr('font-size', '14px')
                );
                line
                .select('.line')
                .transition()
                .attr("d", d3.line()
                    .x(function(d) { return x(d.date) })
                    .y(function(d) { return y(d.value) })
                )
            });
        }
    }, [status, csvData]);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <div className='line-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Line chart brushed</Typography>
            {(status === 'pending') && <LoadingComp loadingText={'Fetching data'}/>}
            {(status === 'rejected') && <ErrorComp errorText={'Error fetching data'} />}
            <div ref={graphContRef} className='line-chart__cont' ></div>
        </div>
    )
}

export default LineChartBrushed;