import React, { useCallback, useMemo } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const ChordChartLabeled = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const matrix = useMemo(() => [
        [11,  58, 89, 28],
        [ 51, 18, 69, 61],
        [ 80, 145, 80, 85],
        [ 103,  99,  40, 71]
    ], []);

    const renderFunc = useCallback(async (container) => {
        const svg = container
            .append("svg")
                .attr("width", 520)
                .attr("height", 520)
            .append("g")
                .attr("transform", "translate(260,260)");

        const colors = ["turquoise", "darkcyan", "skyblue", "steelblue"];

        const res = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending)
            (matrix)

        // Add the links between groups
        svg
            .datum(res)
            .append("g")
            .selectAll("path")
            .data(d => d)
            .join("path")
                .attr("d", d3.ribbon()
                .radius(210)
                )
                .style("fill", "#fc49a0")
                .style("stroke", "black");

        function groupTicks(d, step) {
            const k = (d.endAngle - d.startAngle) / d.value;
            return d3.range(0, d.value, step).map(function(value) {
                return {value: value, angle: value * k + d.startAngle};
            });
        }

        const group = svg
            .datum(res)
            .append("g")
            .selectAll("g")
            .data(d => d.groups)
            .enter();

        group.append("g")
            .append("path")
            .style("fill", "grey")
            .style("stroke", "#000")
            .attr("d", d3.arc()
              .innerRadius(215)
              .outerRadius(220)
            );

        group
            .selectAll(".group-tick")
            .data(d => groupTicks(d, 25))    // Controls the number of ticks: one tick each 25 here.
            .join("g")
            .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(220,0)`)
            .append("line")               // By default, x1 = y1 = y2 = 0, so no need to specify it.
              .attr("x2", 6)
              .attr("stroke", isDarkMode ? '#fff' : '#000');
        
        group
              .selectAll(".group-tick-label")
              .data(d => groupTicks(d, 25))
              .enter()
              .filter(d => d.value % 25 === 0)
              .append("g")
                .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(220,0)`)
              .append("text")
                .attr("x", 10)
                .attr("dy", ".35em")
                .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
                .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
                .text(d => d.value)
                .style("font-size", 12)
                .attr('font-family', 'Space Mono')
                .attr('fill', isDarkMode ? '#fff' : '#000')

    }, [matrix, isDarkMode]);

    const graphContRef = useD3(renderFunc, [], false);

    return (
        <div className='chord-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Chord Chart Labeled</Typography>
            <div ref={graphContRef} className='chord-chart__cont' ></div>
        </div>
    )
}

export default ChordChartLabeled;