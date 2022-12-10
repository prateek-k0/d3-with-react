import React, { useCallback, useMemo } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';

const ChordChartColored = () => {

    const matrix = useMemo(() => [
        [0,  5871, 8916, 2868],
        [ 1951, 0, 2060, 6171],
        [ 8010, 16145, 0, 8045],
        [ 1013,   990,  940, 0]
      ], []);

    const renderFunc = useCallback(async (container) => {
        const svg = container
            .append("svg")
                .attr("width", 440)
                .attr("height", 440)
            .append("g")
                .attr("transform", "translate(220,220)");

        const colors = ["turquoise", "darkcyan", "skyblue", "steelblue"];

        const res = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending)
            (matrix)

        // add the groups on the outer part of the circle
        svg
            .datum(res)
            .append("g")
            .selectAll("g")
            .data(function(d) { return d.groups; })
            .join("g")
            .append("path")
                .style("fill", (d,i) => colors[i])
                .style("stroke", "#000")
                .attr("d", d3.arc()
                .innerRadius(205)
                .outerRadius(210)
                );
        
        svg
            .datum(res)
            .append("g")
            .selectAll("path")
            .data(d => d)
            .join("path")
              .attr("d", d3.ribbon()
                .radius(200)
              )
              .style("fill", d => colors[d.source.index]) // colors depend on the source group. Change to target otherwise.
              .style("stroke", '#000');

    }, [matrix]);

    const graphContRef = useD3(renderFunc, null, false);

    return (
        <div className='chord-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Chord Chart Colored</Typography>
            <div ref={graphContRef} className='chord-chart__cont' ></div>
        </div>
    )
}

export default ChordChartColored;