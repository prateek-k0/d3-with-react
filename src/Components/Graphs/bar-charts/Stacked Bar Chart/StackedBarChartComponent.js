import React, { useRef, useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const data = [
    {
      month: 'Aug',
      Defect: '10',
      Flag: '30',
      Good: '40',
    },
    {
      month: 'Sep',
      Defect: '90',
      Flag: '50',
      Good: '60',
    },
    {
      month: 'Oct',
      Defect: '120',
      Flag: '100',
      Good: '80',
    },
    {
      month: 'Nov',
      Defect: '130',
      Flag: '50',
      Good: '120',
    },
    {
      month: 'Dec',
      Defect: '200',
      Flag: '80',
      Good: '100',
    },
    {
      month: 'Jan',
      Defect: '160',
      Flag: '90',
      Good: '80',
    },
];

const StackedBarChartComponent = () => {

    const themeMode = useSelector(state => +(state.theme.darkMode));

    const configRef = useRef({
        svg: undefined,
        margin: {
            top: 50, bottom: 50, left: 100, right: 100,
        },
        height: 0,
        width: 0,
        paddingLeft: 100,
        paddingTop: 10,
        keys: ['Defect', 'Flag', 'Good'],
        colors: [['black', 'darkgrey', 'grey'], ['#ffffffee', '#ffffffaa', 'grey']],
        selector: 'bar-graph-stacked-section',
    });

    const stacks = useCallback(() => d3.stack().keys(configRef.current.keys)(data), []);

    const renderSVG = useCallback((containerD3) => {
        const contHeight = 640;
        configRef.current.height = contHeight - configRef.current.margin.top - configRef.current.margin.bottom;
        configRef.current.svg = containerD3.append('svg')
            .attr('class', configRef.current.selector)
            .attr('height', configRef.current.height + configRef.current.margin.top + configRef.current.margin.bottom)
            .attr('width', '100%');
        configRef.current.width = containerD3.node().clientWidth - configRef.current.margin.left - configRef.current.margin.right;
    }, []);

    const xScale = useCallback(() => 
        d3.scaleBand()
            .domain(stacks()[0].map((d) => d.data.month))
            .rangeRound([0, configRef.current.width]),
        [stacks]
    );

    const yScale = useCallback(() => {
        const max = d3.max(stacks()[stacks().length - 1], (d) => (d[0] + d[1])) || 0;
        return d3.scaleLinear()
            .domain([0, max])
            .rangeRound([configRef.current.height, 0])
            .nice();
    }, [stacks]);

    const renderXAxis = useCallback(() => {
        const xAxis = d3.axisBottom(xScale());
        configRef.current.svg
            .append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', `translate(${configRef.current.paddingLeft},${configRef.current.height + configRef.current.paddingTop})`)
            .call(xAxis)
            .call((d) => {
                d.selectAll('text')
                  .attr('font-family', 'Space Mono')
                  .attr('font-size', '12px');
            });
    }, [xScale]);

    const renderYAxis = useCallback(() => {
        const yAxis = d3.axisLeft(yScale()).ticks(Math.ceil(data.length));
        configRef.current.svg
            .append('g')
            .attr('class', 'axis axis--y')
            .attr('transform', `translate(${configRef.current.paddingLeft},${configRef.current.paddingTop})`)
            .call(yAxis)
            .call((d) => {
                d.selectAll('text')
                  .attr('font-family', 'Space Mono')
                  .attr('font-size', '12px');
            });
    }, [yScale]);

    const renderStacks = useCallback(() => {
        const layer = configRef.current.svg.selectAll('.layer')
            .data(stacks())
            .join('g')
            .attr('class', 'layer')
            .style('fill', (d, i) => (configRef.current.colors[themeMode][i]));

        layer.selectAll('rect')
            .data((d) => d)
            .join('rect')
            .attr('x', (d) => (xScale()(d.data.month) + xScale().bandwidth() / 4) + configRef.current.paddingLeft)
            .attr('y', (d) => (yScale()(d[0] + d[1])) + configRef.current.paddingTop)
            .attr('height', (d) => yScale()(d[0]) - yScale()(d[1] + d[0]))
            .attr('width', xScale().bandwidth() / 2);
    }, [stacks, xScale, yScale, themeMode]);

    const renderGraph = useCallback((container) => {
        renderSVG(container);
        renderXAxis();
        renderYAxis();
        renderStacks();
    }, [renderSVG, renderXAxis, renderYAxis, renderStacks]);

    const graphContRef = useD3(renderGraph, [data.length]);

    return (
        <div className='stacked-bar-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Stacked Bar Chart</Typography>
            <div ref={graphContRef} className='stacked-bar-chart__cont'></div>
        </div>
    )
}

export default StackedBarChartComponent;