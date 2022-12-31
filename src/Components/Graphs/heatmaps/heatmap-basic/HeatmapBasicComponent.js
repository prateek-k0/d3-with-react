import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import { useAsync } from '../../../Common/Hooks/useAsync';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import LoadingComp from '../../../Common/LoadingComponent/LoadingComponent';
import ErrorComp from '../../../Common/ErrorComponent/ErrorComponent';

const HeatmapBasic = () => {
    const getCSVData = useCallback(async () => {
        return d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv');
    }, []);

    const { value: data, status } = useAsync(getCSVData, true);

    const renderFunc = useCallback(async (container) => {
        if(status === 'fulfilled') {
            const margin = {top: 50, right: 50, bottom: 50, left: 50},
                width = 600 - margin.left - margin.right,
                height = 600 - margin.top - margin.bottom;
            const svg = container
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);
                
            const myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
            const myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

            // Build X scales and axis:
            const x = d3.scaleBand()
                .range([ 0, width ])
                .domain(myGroups)
                .padding(0.01);
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x).tickSize(0))
                .call(d => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '14px')
                .attr('y', 0)
                .attr('dy', 20))

            // Build Y scales and axis:
            const y = d3.scaleBand()
                .range([ height, 0 ])
                .domain(myVars)
                .padding(0.01);
            svg.append("g")
                .call(d3.axisLeft(y).tickSize(0))
                .call(d => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', '14px')
                .attr('x', 0)
                .attr('text-anchor', 'end')
                .attr('dx', -10))

            const myColor = d3.scaleLinear()
                .range(["white", "#69b3a2"])
                .domain([1,100]);

            svg.selectAll()
                .data(data, function(d) {return d.group+':'+d.variable;})
                .join("rect")
                .attr("x", function(d) { return x(d.group) })
                .attr("y", function(d) { return y(d.variable) })
                .attr("width", x.bandwidth() )
                .attr("height", y.bandwidth() )
                .style("fill", function(d) { return myColor(d.value)} )
        }
    }, [status, data]);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <div className='heatmap__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Heatmap Basic</Typography>
            {(status === 'pending') && <LoadingComp loadingText={'Fetching data'}/>}
            {(status === 'rejected') && <ErrorComp errorText={'Error fetching data'} />}
            <div ref={graphContRef} className='heatmap__cont'></div>
        </div>
    )
}

export default HeatmapBasic;