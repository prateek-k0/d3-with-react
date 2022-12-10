import React, { useRef, useCallback, useMemo } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const data = [
    { percentage: 40, label: 'Point 1' },
    { percentage: 30, label: 'Point 2' },
    { percentage: 20, label: 'Point 3' },
    { percentage: 10, label: 'Point 4' },
];

const DonutChart = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const configRef = useRef({
        selector: 'donut_chart',
        width: 600,
        height: 600,
        margin: 40,
        radius: 0,
        svg: undefined,
        labelValue: 'Total Resources',
        totalCount: 0,
        color: ['#6D6ACC', '#7188DC', '#67CABD', '#DC67CE'],
    });

    const dataDep = useMemo(() => ({ data }), []);

    const renderSVG = useCallback((containerD3) => {
        configRef.current.svg = containerD3.append('svg')
            .attr('class', configRef.current.selector)
            .attr('height', configRef.current.height)
            .attr('width', configRef.current.width);

        configRef.current.svg = configRef.current.svg
            .append('g')
            .attr('transform', `translate(${configRef.current.width / 2},${configRef.current.height / 2})`);
    }, []);

    const renderFunc = useCallback((container) => {
        renderSVG(container);
        configRef.current.radius = (Math.min(configRef.current.width, configRef.current.height) / 2) - 2 * configRef.current.margin;
        data.forEach((d) => { configRef.current.totalCount += d.percentage; });

        const mainArc = d3.arc()
            .innerRadius(() => configRef.current.radius * 0.7)
            .outerRadius(() => configRef.current.radius)
            .padAngle(0.025);
        const lineLength = configRef.current.radius + 30;

        const arcOuterLine = d3.arc()
            .innerRadius(lineLength)
            .outerRadius(lineLength);
        const arcOuterValue = d3.arc()
            .innerRadius(lineLength + 18)
            .outerRadius(lineLength + 18);
        const pie = d3.pie()
            .value((d) => d.percentage)
            .sort(null);
        const paths = configRef.current.svg.selectAll('g')
            .data(pie(data))
            .enter();
        const dot = d3.arc()
            .outerRadius(configRef.current.radius)
            .innerRadius(configRef.current.radius + 10);
        
        // Add the polylines between chart and labels:
        paths.append('polyline')
            .attr('stroke', '#707070')
            .attr('stroke-width', '1px')
            .attr('stroke-dasharray', '1')
            .attr('fill', 'none')
            .attr('points', (d) => {
            const posA = dot.centroid(d); 
            const posB = arcOuterLine.centroid(d);
            return [posA, posB];
            });

        // Add circle to the polyline
        paths.append('circle')
            .attr('r', 3)
            .attr('transform', (d) => `translate(${dot.centroid(d)})`)
            .attr('fill', (d, i) => configRef.current.color[i]);

        // Add values to the charts
        paths.append('text')
            .attr('transform', (d) => `translate(${arcOuterValue.centroid(d)})`)
            .attr('font-family', 'Space Mono')
            .attr('font-size', 400)
            .attr('font-size', '12px')
            .attr('fill', isDarkMode ? '#fff' : '#000')
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .text((d) => `${d.value}%`);

        paths.append('circle')
            .attr('class', 'legendBigcircle')
            .attr('r', 15)
            .attr('transform', (d) => `translate(${arcOuterValue.centroid(d)})`)
            .attr('fill', 'transparent')
            .attr('stroke', (d, i) => configRef.current.color[i])
            .style('stroke-width', 3);

        paths.append('path')
            .attr('d', mainArc)
            .attr('fill', (d, i) => configRef.current.color[i]);
    }, [renderSVG, isDarkMode]);

    const graphContRef = useD3(renderFunc, dataDep, false);

    return (
        <div className='pie-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Donut Chart</Typography>
            <div ref={graphContRef} className='pie-chart__cont'></div>
        </div>
    );
}

export default DonutChart;