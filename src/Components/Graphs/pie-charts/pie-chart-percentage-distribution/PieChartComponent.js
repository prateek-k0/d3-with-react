import React, { useRef, useCallback, useMemo } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const data = [
    { value: 5, color: '#6D6ACC', radius: 0 },
    { value: 2, color: '#7188DC', radius: 0 },
    { value: 2, color: '#75A5EB', radius: 0 },
    { value: 2, color: '#67B7DC', radius: 0 },
    { value: 5, color: '#67CABD', radius: 0 },
    { value: 2, color: '#8FD399', radius: 0 },
    { value: 2, color: '#B7DC75', radius: 0 },
    { value: 5, color: '#DCDC67', radius: 0 },
    { value: 5, color: '#DCC467', radius: 0 },
    { value: 2, color: '#D7A267', radius: 0 },
    { value: 2, color: '#E1E1E1', radius: 0 },
    { value: 2, color: '#F3A6CD', radius: 0 },
    { value: 2, color: '#ED88BB', radius: 0 },
    { value: 2, color: '#E769A8', radius: 0 },
    { value: 2, color: '#DC67CE', radius: 0 },
    { value: 2, color: '#9657D5', radius: 0 },
    { value: 56, color: '#60607F', radius: 0 },
];

const PieChartPercentageDistribution = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const configRef = useRef({
        svg: undefined,
        selector: 'pie-circle-chart-two-section',
        width: 600,
        height: 600,
        margin: 0,
        donutChart: undefined
    });

    const dataDep = useMemo(() => ({ data }), []);

    const renderFunc = useCallback((container) => {
        configRef.current.svg = container.append('svg')
            .attr('class', configRef.current.selector)
            .attr('height', configRef.current.height)
            .attr('width', configRef.current.width);
        configRef.current.donutChart = configRef.current.svg
            .append('g')
            .attr('transform', `translate(${configRef.current.width / 2},${configRef.current.height / 2 - 30})`)
            .attr('class', 'slices labels lines circles circles');
        
        const radius = Math.min(configRef.current.width, configRef.current.height) / 4 - configRef.current.margin;

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius((d) => radius + d.data.radius);
        const label = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius + 120);
        const dot = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius + 22);
        const pie = d3.pie()
            .value((d) => d.value)
            .sort(null);
        
        configRef.current.donutChart
            .selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d) => d.data.color);

        const legendLine = configRef.current.donutChart.selectAll('line')
            .data(pie(data))
            .enter();
        legendLine.append('line')
            .attr('x1', (d) => dot.centroid(d)[0])
            .attr('y1', (d) => dot.centroid(d)[1])
            .attr('x2', (d) => label.centroid(d)[0])
            .attr('y2', (d) => label.centroid(d)[1])
            .attr('stroke', isDarkMode ? '#ccc' : '#707070')
            .attr('stroke-width', '1px')
            .attr('stroke-dasharray', '1')
            .attr('fill', 'none');

        const legendCircle1 = configRef.current.donutChart.selectAll('circle')
            .data(pie(data))
            .enter();
        configRef.current.donutChart
            .append('circle')
            .attr('r', radius + 11)
            .attr('stroke', isDarkMode ? '#aaa' : '#888')
            .attr('stroke-width', '1px')
            .attr('fill', 'none');

        const labels = configRef.current.donutChart.selectAll('text')
            .data(pie(data))
            .enter();
        labels.append('text')
            .attr('transform', (d) => `translate(${label.centroid(d)})`)
            .attr('dy', '0.4em')
            .style('text-anchor', 'middle')
            .style('font-weight', '900')
            .attr('font-size', '14px')
            .attr('font-family', 'Space Mono')
            .attr('fill', isDarkMode ? '#ddd' : '#707070')
            .text((d) => `${d.data.value}%`);
      
          legendCircle1
            .append('circle')
            .attr('class', 'legendcircle')
            .attr('r', 4)
            .attr('stroke', (d) => d.data.color)
            .attr('stroke-width', 2)
            .attr('transform', (d) => `translate(${dot.centroid(d)})`)
            .attr('fill', isDarkMode ? '#121212' : '#fff');
    }, [isDarkMode]);

    const graphContRef = useD3(renderFunc, dataDep, false);

    return (
        <div className='pie-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Pie Chart Percentage Distribution</Typography>
            <div ref={graphContRef} className='pie-chart__cont'></div>
        </div>
    )
}

export default PieChartPercentageDistribution