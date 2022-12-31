import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import { useAsync } from '../../../Common/Hooks/useAsync';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import LoadingComp from '../../../Common/LoadingComponent/LoadingComponent';
import ErrorComp from '../../../Common/ErrorComponent/ErrorComponent';

const HistogramBasic = () => {
    const getCSVData = useCallback(async () => {
        return d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv');
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
                .domain([0, 1000])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
                .range([0, width]);
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x))
                .call((d) => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '12px'));
    
            const histogram = d3.histogram()
                .value(function(d) { return d.price; })   // I need to give the vector of value
                .domain(x.domain())  // then the domain of the graphic
                .thresholds(x.ticks(70)); // then the numbers of bins
          
            // And apply this function to data to get the bins
            const bins = histogram(data);
    
            const y = d3.scaleLinear()
                .range([height, 0]);
            y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
            svg.append("g")
                .call(d3.axisLeft(y))
                .call((d) => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '12px'));
    
            // append the bar rectangles to the svg element
            svg.selectAll("rect")
                .data(bins)
                .join("rect")
                .attr("x", 1)
                .attr("transform", function(d) { return `translate(${x(d.x0)} , ${y(d.length)})`})
                .attr("width", function(d) { return x(d.x1) - x(d.x0)})
                .attr("height", function(d) { return height - y(d.length); })
                .style("fill", "#69b3a2")
        }
    }, [status, data]);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <div className='histogram__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Histogram Basic</Typography>
            {(status === 'pending') && <LoadingComp loadingText={'Fetching data'}/>}
            {(status === 'rejected') && <ErrorComp errorText={'Error fetching data'} />}
            <div ref={graphContRef} className='histogram__cont'></div>
        </div>
    )
}

export default HistogramBasic;