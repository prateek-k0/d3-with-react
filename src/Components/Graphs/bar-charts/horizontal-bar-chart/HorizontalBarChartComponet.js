import React, { useRef, useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';

const data = [
    {
      vertical: 'Agile Progress',
      value: '-10.0',
      type: 'B',
    },
    {
      vertical: 'Agile Progress',
      value: '-80.0',
      type: 'B',
    },
    {
      vertical: 'Agile Progress',
      value: '50.0',
      type: 'A',
    },
    {
      vertical: 'Agile Progress',
      value: '90.0',
      type: 'A',
    },
    {
      vertical: 'Test',
      value: '100',
      type: 'A',
    },
    {
      vertical: 'Test',
      value: '-110',
      type: 'B',
    },
    {
      vertical: 'DevOps',
      value: '90',
      type: 'A',
    },
    {
      vertical: 'DevOps',
      value: '-110',
      type: 'B',
    },
    {
      vertical: 'AD',
      value: '100',
      type: 'A',
    },
    {
      vertical: 'AD',
      value: '-110',
      type: 'B',
    },
    {
      vertical: 'AM',
      value: '90',
      type: 'A',
    },
    {
      vertical: 'AM',
      value: '-110',
      type: 'B',
    },
    {
      vertical: 'Agile',
      value: '-110',
      type: 'B',
    },
    {
      vertical: 'Agile',
      value: '90',
      type: 'A',
    },
    {
      vertical: 'Agile',
      value: '-110',
      type: 'B',
    },
];

const HorizontalBarChart = () => {

    const configRef = useRef({
        keys: ['average', 'good', 'bad'],
        selector: 'bar-graph-stacked-horizontal-section',
        margin: {
            top: 50, bottom: 50, left: 100, right: 100,
        },
        svg: undefined,
        graph: undefined,
        height: 0,
        width: 0,
    });

    const getPreparedData = useCallback(() => {
        const groupData = d3.group(data, (d) => d.vertical);
        let nest = [];
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of groupData.entries()) {
            nest.push(value);
        }

        nest = nest.map((verticals) => {
            const obj = {};
            const result = {};
            let key;
            const netNominal = d3.sum(verticals, (d) => d.value);
      
            key = netNominal >= 0 ? key = 'good' : key = 'bad';
            obj[key] = Math.abs(netNominal);
      
            // nest 2
            const groupDataInner = d3.group(verticals, (d) => d.type);
            const nestInner = [];
            // eslint-disable-next-line no-restricted-syntax
            for (const [keyInner, value] of groupDataInner.entries()) {
              nestInner.push({ keyInner, values: value });
            }
            let nominal = nestInner.map((d) => {
              const sum = d.values.reduce((acc, objInner) => acc + parseInt(objInner.value, 10), 0);
              return { key: d.key, value: sum };
            });
      
            nominal = nominal.length > 1 ? d3.min(nominal, (d) => Math.abs(d.value)) : 0;
            obj.vertical = verticals[0].vertical;
            obj.average = nominal;
            obj.total = obj.average + obj[key];
      
            result.key = verticals[0].vertical;
            result.value = obj;
      
            return result;
          });
      
          const stackedData = d3.stack().keys(configRef.current.keys)(nest.map((d) => d.value));
          return { nest, stack: stackedData };
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

    const xScale = useCallback(() => {
        const obj = getPreparedData().nest;
        return d3.scaleLinear()
            .domain([0, d3.max(obj, ((d) => d.value.total)) || 0])
            .range([1, configRef.current.width])
            .nice();
    }, [getPreparedData]);

    const yScale = useCallback(() => {
        return d3.scaleBand()
            .domain(getPreparedData().nest.map((d) => d.key))
            .range([configRef.current.height, 0])
            .padding(0.3);
    }, [getPreparedData]);

    const renderXAxis = useCallback(() => {
        configRef.current.graph.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0, ${configRef.current.height})`)
            .call(d3.axisBottom(xScale()))
            .call((d) => d.select('.domain').remove())
            .call((d) => {
                d.selectAll('line')
                .style('stroke-opacity', 0);
                d.selectAll('text')
                .attr('y', 3).remove();
            });
    }, [xScale]);

    const renderYAxis = useCallback(() => {
        configRef.current.graph.append('g')
            .attr('class', 'axis y-axis')
            .style('font-family', 'Space Mono')
            .call(d3.axisLeft(yScale()))
            .call((d) => d.select('.domain').remove())
            .call((d) => d.selectAll('line').style('stroke-opacity', 0));
    }, [yScale])

    const renderVerticalLines = useCallback(() => {
        configRef.current.graph.append('g')
            .attr('class', 'grid')
            .style('stroke-opacity', 0.3)
            .attr('transform', `translate(0,${configRef.current.height})`)
            .call(d3.axisBottom(xScale())
                .tickSize(-configRef.current.height + 5))
            .call((d) => {
                d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-weight', 400)
                .attr('font-size', '12px');
            })
            .call((d) => d.select('.domain').remove());
    }, [xScale]);

    const renderStacks = useCallback(() => {
    const z = d3.scaleOrdinal()
      .range(['#dbdbdb', '#C0C0C0', '#808080']);
      configRef.current.graph.append('g')
      .selectAll('g')
      .data(getPreparedData().stack)
      .join('g')
      .attr('fill', (d) => z(d.key))
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => xScale()(d[0]))
      .attr('y', (d) => yScale()(d.data.vertical))
      .attr('height', yScale().bandwidth())
      .attr('width', (d) => (xScale()(d[1]) - xScale()(d[0]) || 0));
    }, [getPreparedData, xScale, yScale])

    const renderFunc = useCallback((container) => {
        renderSVG(container);
        renderXAxis();
        renderYAxis(0);
        renderVerticalLines();
        renderStacks();
    }, [renderSVG, renderXAxis, renderYAxis, renderVerticalLines, renderStacks]);

    const graphContRef = useD3(renderFunc, [data.length]);

    return (
        <div className='horizontal-bar-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Horizontal Bar Chart</Typography>
            <div ref={graphContRef} className='horizontal-bar-chart__cont'></div>
        </div>
    )
}

export default HorizontalBarChart;