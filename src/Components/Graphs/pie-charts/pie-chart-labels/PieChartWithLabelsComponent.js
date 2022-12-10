import React, { useRef, useCallback, useMemo } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const data = [
    {
      label: 'Category 1',
      value: 40,
      color: '#60607F',
      radius: 16,
    },
    {
      label: 'Category 2',
      value: 20,
      color: '#6D6ACC',
      radius: 12,
    },
    {
      label: 'Category 3',
      value: 15,
      color: '#9657D5',
      radius: 8,
    },
    {
      label: 'Category 4',
      value: 15,
      color: '#DC67CE',
      radius: 4,
    },
    {
      label: 'Category 5',
      value: 10,
      color: '#E4E4E4',
      radius: 0,
    }
];

const PieChartWithLabels = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const configRef = useRef({
        svg: undefined,
        selector: 'pie-circle-chart-section',
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
            .innerRadius(radius + 150);
        const dot = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius + 45);
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
            .attr('stroke', isDarkMode ? '#ddd' : '#707070')
            .attr('stroke-width', '1px')
            .attr('stroke-dasharray', '1')

        const legendCircle1 = configRef.current.donutChart.selectAll('circle')
            .data(pie(data))
            .enter();

        legendCircle1
            .append('circle')
            .attr('r', 18)
            .attr('transform', (d) => `translate(${label.centroid(d)})`)
            .attr('fill', isDarkMode ? '#121212' : '#fff')
            .attr("stroke", (d)=> d.data.color)
            .style("stroke-width", 4);

        const labels = configRef.current.donutChart.selectAll('text')
            .data(pie(data))
            .enter();

        labels.append('text')
            .attr('transform', (d) => `translate(${label.centroid(d)})`)
            .attr('dy', '.35em')
            .style('text-anchor', 'middle')
            .attr('font-size', '13px')
            .style('font-family', 'Space Mono')
            .style('font-weight', 400)
            .attr('fill', isDarkMode ? '#fff' : '#000000de')
            .text((d) => `${d.data.value}`);

        legendCircle1
            .append('circle')
            .attr('class', 'legendcircle')
            .attr('r', 2)
            .attr('transform', (d) => `translate(${dot.centroid(d)})`)
            .attr('fill', (d) => d.data.color);
    }, [isDarkMode]);

    const graphContRef = useD3(renderFunc, dataDep, false);

    return (
        <div className='pie-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Pie Chart With Labels</Typography>
            <div ref={graphContRef} className='pie-chart__cont'></div>
        </div>
    )
}

export default PieChartWithLabels;