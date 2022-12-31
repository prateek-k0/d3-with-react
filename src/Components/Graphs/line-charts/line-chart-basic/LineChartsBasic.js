import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import { useAsync } from '../../../Common/Hooks/useAsync';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import LoadingComp from '../../../Common/LoadingComponent/LoadingComponent';
import ErrorComp from '../../../Common/ErrorComponent/ErrorComponent';

const LineChartBasic = () => {
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
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x).tickSizeOuter(0))
                .call((d) => d.selectAll('text')
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

            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.value) })
                );
        }
    }, [status, csvData]);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <div className='line-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Line chart basic</Typography>
            {(status === 'pending') && <LoadingComp loadingText={'Fetching data'}/>}
            {(status === 'rejected') && <ErrorComp errorText={'Error fetching data'} />}
            <div ref={graphContRef} className='line-chart__cont' ></div>
        </div>
    )
}

export default LineChartBasic;