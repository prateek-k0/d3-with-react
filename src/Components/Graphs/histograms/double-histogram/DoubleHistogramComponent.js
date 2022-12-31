import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import { useAsync } from '../../../Common/Hooks/useAsync';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import LoadingComp from '../../../Common/LoadingComponent/LoadingComponent';
import ErrorComp from '../../../Common/ErrorComponent/ErrorComponent';

const DoubleHistogram = () => {
    const getCSVData = useCallback(async () => {
        return d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_doubleHist.csv');
    }, []);

    const { value: data, status } = useAsync(getCSVData, true);

    const renderFunc = useCallback(async (container) => {
        if(status === 'fulfilled') {
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

            const x = d3.scaleLinear()
                .domain([-4,9])   
                .range([0, width]);
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x))
                .call((d) => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '12px'));

            const histogram = d3.histogram()
                .value(function(d) { return +d.value; })   // I need to give the vector of value
                .domain(x.domain())  // then the domain of the graphic
                .thresholds(x.ticks(40)); // then the numbers of bins
        
            // And apply twice this function to data to get the bins.
            const bins1 = histogram(data.filter( function(d){return d.type === "variable 1"} ));
            const bins2 = histogram(data.filter( function(d){return d.type === "variable 2"} ));

            const y = d3.scaleLinear()
                .range([height, 0]);
                y.domain([0, d3.max(bins1, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
            svg.append("g")
                .call(d3.axisLeft(y))
                .call((d) => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '12px'));

            svg.selectAll("rect")
                .data(bins1)
                .join("rect")
                .attr("x", 1)
                .attr("transform", function(d) { return `translate(${x(d.x0)} , ${y(d.length)})`})
                .attr("width", function(d) { return Math.max(x(d.x1) - x(d.x0) -1, 0) ; })
                .attr("height", function(d) { return height - y(d.length); })
                .style("fill", "#69b3a2")
                .style("opacity", 0.8)

            svg.selectAll("rect2")
                .data(bins2)
                .enter()
                .append("rect")
                .attr("x", 1)
                .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
                .attr("width", function(d) { return Math.max(x(d.x1) - x(d.x0) -1, 0) ; })
                .attr("height", function(d) { return height - y(d.length); })
                .style("fill", "#4060aa")
                .style("opacity", 0.8)
        }
    }, [status, data]);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <div className='histogram__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Double Histogram</Typography>
            {(status === 'pending') && <LoadingComp loadingText={'Fetching data'}/>}
            {(status === 'rejected') && <ErrorComp errorText={'Error fetching data'} />}
            <div ref={graphContRef} className='histogram__cont'></div>
        </div>
    )
}

export default DoubleHistogram;