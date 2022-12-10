import React, { useRef, useCallback, useMemo } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';

const data = [{
    Contracts: 'Effort', v1: 1163, v2: 2567, v3: 4860,
  },
  {
    Contracts: 'Schedule', v1: 2448, v2: 3442, v3: 2700,
  },
  {
    Contracts: 'Quality', v1: 2531, v2: 2653, v3: 3406,
  },
  {
    Contracts: 'Scope & Prod.', v1: 2004, v2: 2857, v3: 3729,
  },
  {
    Contracts: 'Service Perf.', v1: 3880, v2: 2365, v3: 2345,
  },
  {
    Contracts: 'Resouces', v1: 1662, v2: 2885, v3: 4517,
}];

const ClusteredBarChart = () => {
    const configRef = useRef({
        groupKey: 'Contracts',
        keys: ['v1', 'v2', 'v3'],
        yAxisName: '% Utillisation',
        borderColorData: ['#c00000', '#e37f07', '#00b050'],
        barColorData: ['#ea3737', '#eabe37', '#9dc96f'],
        selector: 'c-group-contracts-bar-chart-section',
        margin: {
            top: 50, bottom: 50, left: 100, right: 100,
        },
        svg: undefined,
        graph: undefined,
        width: 0,
        height: 0
    });

    const dataDep = useMemo(() => ({ data }), []);

    const color_codes = useCallback(() => {
        return d3.scaleOrdinal()
            .domain(configRef.current.keys)
            .range(configRef.current.barColorData);
    }, []);

    const renderSVG = useCallback((containerD3) => {
        const contHeight = 640;
        configRef.current.height = contHeight - configRef.current.margin.top - configRef.current.margin.bottom;
        configRef.current.svg = containerD3.append('svg')
            .attr('class', configRef.current.selector)
            .attr('height', configRef.current.height + configRef.current.margin.top + configRef.current.margin.bottom)
            .attr('width', '100%');
        configRef.current.width = containerD3.node().clientWidth - configRef.current.margin.left - configRef.current.margin.right;

        configRef.current.graph = configRef.current.svg
            .append('g')
            .attr('transform', `translate(${configRef.current.margin.left},${configRef.current.margin.top / 2})`);
    }, []);

    const x3 = useCallback(() => {
        return d3.scaleBand()
            .domain(data.map((d) => d[configRef.current.groupKey]))
            .rangeRound([0, configRef.current.width]);
    }, []);

    const x4 = useCallback(() => {
        return d3.scaleBand()
            .domain(configRef.current.keys)
            .rangeRound([20, x3().bandwidth()])
            .padding(0.2);
    }, [x3]);

    const yScale = useCallback(() => {
        const domainMax = d3.max(data, (d) => d3.max(configRef.current.keys, (key) => d[key]));
        return d3.scaleLinear()
            .domain([0, domainMax])
            .rangeRound([configRef.current.height, 0])
            .nice();
    }, []);

    const renderXAxis = useCallback(() => {
        configRef.current.graph.append('g')
            .attr('class', 'x-axis')
            .style('font-family', 'Space Mono')
            .style('font-size', '12px')
            .attr('transform', `translate(0,${configRef.current.height})`)
            .call(d3.axisBottom(x3()));
    }, [x3]);

    const renderYAxis = useCallback(() => {
        configRef.current.graph.append('g')
            .attr('class', 'y-axis')
            .style('font-family', 'Space Mono')
            .style('font-size', '12px')
            .call(d3.axisLeft(yScale()).ticks(null, 's'));
    }, [yScale]);

    const renderBars = useCallback(() => {
        configRef.current.graph.append('g')
            .selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'bar')
            .attr('transform', (d) => `translate(${x3()(d[configRef.current.groupKey])},0)`)
            .selectAll('rect')
            .data((d) => configRef.current.keys.map((key) => ({ key, value: d[key] })))
            .enter()
            .append('rect')
            .attr('x', (d) => x4()(d.key) - x4().bandwidth() / 3)
            .attr('y', (d) => yScale()(d.value))
            .attr('width', x4().bandwidth())
            .attr('height', (d) => configRef.current.height - yScale()(d.value))
            .attr('fill', (d) => { d.color = color_codes()(d.key); return d.color; });
    }, [x3, x4, yScale, color_codes]);

    const renderGraph = useCallback((container) => {
        renderSVG(container);
        renderXAxis();
        renderYAxis();
        renderBars();
    }, [renderSVG, renderXAxis, renderYAxis, renderBars]);

    const graphContRef = useD3(renderGraph, dataDep);

    return (
        <div className='clustered-bar-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Clustered Bar Chart</Typography>
            <div ref={graphContRef} className='clustered-bar-chart__cont'></div>
        </div>
    )
}

export default ClusteredBarChart;