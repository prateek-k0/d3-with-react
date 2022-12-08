import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';

const ScatterPlotBasic = () => {

    const renderFunc = useCallback(async (container) => {
        const margin = {top: 10, right: 30, bottom: 30, left: 100},
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
        // append the svg object to the body of the page
        const svg = container
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)

        const data = await d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv");

        const x = d3.scaleLinear()
            .domain([0, 0])
            .range([ 0, 0 ]);
        svg.append("g")
            .attr("class", "myXaxis") 
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .call((d) => d.selectAll('text')
            .attr('font-family', 'Space Mono')
            .attr('font-size', '12px'))
            .attr("opacity", "0");

        const y = d3.scaleLinear()
            .domain([0, 500000])
            .range([ height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y))
            .call((d) => d.selectAll('text')
            .attr('font-family', 'Space Mono')
            .attr('font-size', '12px'));

        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
              .attr("cx", function (d) { return x(d.GrLivArea); } )
              .attr("cy", function (d) { return y(d.SalePrice); } )
              .attr("r", 2)
              .attr('stroke', '#fff')
              .attr('stroke-width', 1)
              .style("fill", "magenta")
              .on('mouseover', (event, d) => {
                d3.select(event.target)
                    .raise()
                    .attr('r', '8')
                    .attr('stroke-width', 2);
              })
              .on('mouseleave', (event, d) => {
                d3.select(event.target)
                    .attr('r', '4')
                    .attr('stroke-width', 1);
              });

        // new X axis
        x.domain([0, 6000]).range([ 0, width ]);
        svg.select(".myXaxis")
            .transition()
            .duration(1500)
            .attr("opacity", "1")
            .call(d3.axisBottom(x))
            .call((d) => d.selectAll('text')
            .attr('font-family', 'Space Mono')
            .attr('font-size', '12px'));

        svg.selectAll("circle")
            .transition()
            .delay(function(d,i){return(i * 1.5)})
            .duration(1500)
            .attr("cx", function (d) { return x(d.GrLivArea); } )
            .attr("cy", function (d) { return y(d.SalePrice); } )
            .attr("r", 4)
            .style("fill", "#02b4fa");
    }, []);

    const graphContRef = useD3(renderFunc, [], false);

    return (
        <div className='scatter-plot__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Scatter plot Basic</Typography>
            <div ref={graphContRef} className='scatter-plot__cont'></div>
        </div>
    )
}

export default ScatterPlotBasic;