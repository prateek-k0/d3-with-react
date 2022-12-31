import React, { useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import { useAsync } from '../../../Common/Hooks/useAsync';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import * as d3Hexbin from "d3-hexbin";
import { useSelector } from 'react-redux';
import LoadingComp from '../../../Common/LoadingComponent/LoadingComponent';
import ErrorComp from '../../../Common/ErrorComponent/ErrorComponent';

const HexbinDensityChart = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const getCSVData = useCallback(async () => {
        return d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_for_density2d.csv');
    }, []);

    const { value: data, status } = useAsync(getCSVData, true);

    const renderFunc = useCallback(async (container) => {
        if(status === 'fulfilled') {
            const margin = {top: 40, right: 40, bottom: 40, left: 40},
                width = 640 - margin.left - margin.right,
                height = 640 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            const svg = container
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            // Add X axis
            const x = d3.scaleLinear()
                .domain([5, 18])
                .range([ 0, width ]);
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x))
                .call(d => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', 14));

            // Add Y axis
            const y = d3.scaleLinear()
                .domain([5, 20])
                .range([ height, 0 ]);
            svg.append("g")
                .call(d3.axisLeft(y))
                .call(d => d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-size', 14));

            // Reformat the data: d3-hexbin() needs a specific format
            const inputForHexbinFun = []
            data.forEach(function(d) {
                inputForHexbinFun.push( [x(d.x), y(d.y)] )  // Note that we had the transform value of X and Y !
            })

            // Prepare a color palette
            const color = d3.scaleLinear()
                .domain([0, 250]) // Number of points in the bin?
                .range(["transparent",  "#038aff"])

            // Compute the hexbin data
            const hexbin = d3Hexbin.hexbin()
                .radius(9) // size of the bin in px
                .extent([ [0, 0], [width, height] ])

            // Plot the hexbins
            svg.append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", width)
                .attr("height", height)

            svg.append("g")
                .attr("clip-path", "url(#clip)")
                .selectAll("path")
                .data( hexbin(inputForHexbinFun) )
                .join("path")
                .attr("d", hexbin.hexagon())
                .attr("transform", function(d) { return `translate(${d.x}, ${d.y})`})
                .attr("fill", function(d) { return color(d.length); })
                .attr("stroke", isDarkMode ? '#fff' : '#000')
                .attr("stroke-width", "0.1")
        }
    }, [isDarkMode, status, data]);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <div className='area__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Hexbin Density Chart</Typography>
            {(status === 'pending') && <LoadingComp loadingText={'Fetching data'}/>}
            {(status === 'rejected') && <ErrorComp errorText={'Error fetching data'} />}
            <div ref={graphContRef} className='area__cont'></div>
        </div>
    )
}

export default HexbinDensityChart;