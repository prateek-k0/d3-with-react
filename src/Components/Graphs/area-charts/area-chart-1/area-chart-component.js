import React, { useRef } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';

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

const AreaChartComponent = () => {
    const configRef = useRef({
        lineWidth: 0.1,
        gridWidth: 0.3,
        width: 0,
        height: 0,
        margin: {
            top: 50, bottom: 50, left: 100, right: 100,
        },
        keys: ['Defect', 'Flag', 'Good'],
        color: ['royalblue', 'dodgerblue', 'skyblue'],
        selector: 'area-chart-section',
        svg: undefined,
        chart: undefined,
        pulledData: undefined,
        stackedData: [],
        colorScale: undefined,
        areaGenerator: undefined
    });

    const renderGraph = (container) => {
        prepareData();
        generateColors();
        renderSVG(container);
        renderChart();
        drawVerticalLines();
        drawHorizontalLines();
        drawXAxis();
        drawYAxis();
        drawArea();
    };
    const graphContRef = useD3(renderGraph, [data.length]);

    const renderSVG = (containerD3) => {
        const contHeight = 640;
        configRef.current.height = contHeight - configRef.current.margin.top - configRef.current.margin.bottom;
        configRef.current.svg = containerD3.append('svg')
            .attr('class', configRef.current.selector)
            .attr('height', configRef.current.height + configRef.current.margin.top + configRef.current.margin.bottom)
            .attr('width', '100%');
        configRef.current.width = containerD3.node().clientWidth - configRef.current.margin.left - configRef.current.margin.right;
    }

    const renderChart = () => {
        configRef.current.chart = configRef.current.svg
            .append('g')
            .attr('transform', `translate(${configRef.current.margin.left}, ${configRef.current.margin.top})`);
    }

    const prepareData = () => {
        configRef.current.stackedData = [];
        const stack = d3.stack().keys(configRef.current.keys);
        configRef.current.pulledData = stack(data);
        configRef.current.pulledData.forEach((layer) => {
            const currentStack = [];
            layer.forEach((d, i) => {
                currentStack.push({ value: d, month: data[i].month });
            });
            configRef.current.stackedData.push(currentStack);
        });
    }

    const generateColors = () => {
        configRef.current.colorScale = d3.scaleOrdinal()
            .domain(configRef.current.keys)
            .range(configRef.current.color);
    }

    const drawVerticalLines = () => {
        configRef.current.chart.append('g')
            .attr('class', 'grid')
            .call(
                d3.axisBottom(xScale())
                    .tickSize(configRef.current.height)
                    .tickFormat('')
            ).attr('stroke-width', configRef.current.gridWidth);
    }

    const xScale = () => {
        return d3.scalePoint()
            .range([0, configRef.current.width])
            .domain(data.map((s) => s.month));
    }

    const yScale = () => {
        const domainY = d3.max(configRef.current.pulledData[configRef.current.pulledData.length - 1], (dp) => dp[1]);
        return d3
            .scaleLinear()
            .range([configRef.current.height, 0])
            .domain([0, domainY])
            .nice();
    }

    const drawHorizontalLines = () => {
        configRef.current.chart.append('g')
            .attr('class', 'grid')
            .call(
                d3.axisLeft(yScale()).tickSize(-configRef.current.width).tickFormat('')
            ).attr('stroke-width', configRef.current.gridWidth);
    }

    const drawXAxis = () => {
        configRef.current.chart
            .append('g')
            .attr('transform', `translate(0, ${configRef.current.height})`)
            .attr('class', 'axis axis--x')
            .call(d3.axisBottom(xScale()).ticks(data.length).tickPadding(6).tickSize(0))
            .call((d) => {
                d.selectAll('text')
                    .attr('font-family', 'Space Mono')
                    .attr('font-weight', 400)
                    .attr('font-size', '12px');
            });
    }

    const drawYAxis = () => {
        configRef.current.chart
            .append('g')
            .attr('transform', 'translate(0, 0)')
            .call(d3.axisLeft(yScale()).ticks(4).tickSize(0))
            .call((d) => {
                d.selectAll('text')
                  .attr('font-family', 'Space Mono')
                  .attr('font-weight', 400)
                  .attr('font-size', '12px');
              });
    }

    const drawArea = () => {
        const areaGenerator = () => {
            return d3
              .area()
              .x((d) => xScale()(d.month))
              .y0((d) => yScale()(d.value[0]))
              .y1((d) => yScale()(d.value[1]));
          }

        configRef.current.chart
            .selectAll('.series')
            .data(configRef.current.stackedData)
            .enter()
            .append('g')
            .attr('class', 'series')
            .attr('id', (d, i) => configRef.current.colorScale(configRef.current.pulledData[i].key))
            .append('path')
            .attr('fill', (d, i) => configRef.current.colorScale(configRef.current.pulledData[i].key))
            .attr('stroke', 'steelblue')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', configRef.current.lineWidth)
            .attr('d', (d) => areaGenerator()(d))
            .on('mouseover', (event) => {
                event.stopPropagation();
                const element = event.target;
                const currentID = d3.select(element.parentNode).attr('id');
                d3.selectAll('g.series')
                    .attr('opacity', 0.4);
                d3.select(element.parentNode)
                    .attr('opacity', 1);
            }).on('mouseleave', () => {
                d3.selectAll('g.series')
                    .attr('opacity', 1);
            });
        

    }
    
    return (
        <div className='area-chart-1__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 0 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Area Chart 1</Typography>
            <div ref={graphContRef} className='area-chart-1__cont'></div>
        </div>
    )
}

export default AreaChartComponent;