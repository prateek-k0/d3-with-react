import React, { useRef, useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';

const data = [
    {
      Xvalue: '0',
      cat1: '0',
      cat2: '0',
      cat3: '0',
    },
    {
      Xvalue: '5',
      cat1: '5',
      cat2: '0',
      cat3: '0',
    },
    {
      Xvalue: '10',
      cat1: '28',
      cat2: '2',
      cat3: '0',
    },
    {
      Xvalue: '15',
      cat1: '10',
      cat2: '17',
      cat3: '0',
    },
    {
      Xvalue: '20',
      cat1: '5',
      cat2: '12',
      cat3: '1',
    },
    {
      Xvalue: '25',
      cat1: '0.5',
      cat2: '5',
      cat3: '6',
    },
    {
      Xvalue: '30',
      cat1: '0',
      cat2: '0.5',
      cat3: '13.5',
    },
    {
      Xvalue: '35',
      cat1: '0',
      cat2: '0',
      cat3: '21',
    },
    {
      Xvalue: '40',
      cat1: '0',
      cat2: '0',
      cat3: '3',
    },
    {
      Xvalue: '45',
      cat1: '0',
      cat2: '0',
      cat3: '0',
    },
];

const DensityAreaChart = () => {
    const configRef = useRef({
        selector: 'density-chart',
        width: 100,
        height: 100,
        margin: {
            top: 50, bottom: 50, left: 100, right: 100,
        },
        chart: undefined,
        color: ['#8FD399', '#DC67CE', '#9657D5']
    });

    const renderSVG = useCallback((containerD3) => {
        const contHeight = 640;
        configRef.current.height = contHeight - configRef.current.margin.top - configRef.current.margin.bottom;
        configRef.current.svg = containerD3.append('svg')
            .attr('class', configRef.current.selector)
            .attr('height', configRef.current.height + configRef.current.margin.top + configRef.current.margin.bottom)
            .attr('width', '100%');

        configRef.current.width = containerD3.node().clientWidth - configRef.current.margin.left - configRef.current.margin.right;
    
        configRef.current.chart = configRef.current.svg
            .append('g')
            .attr('transform', `translate(${configRef.current.margin.left}, ${configRef.current.margin.top})`);
    }, []);

    const xScale = useCallback(() => {
        return d3.scaleBand()
          .range([0, configRef.current.width])
          .domain(data.map((d) => d.Xvalue))
          .padding(0);
      }, []);
    
    const yScale = useCallback(() => {
        return d3.scaleLinear()
          .rangeRound([configRef.current.height, 0])
          .domain([0, 30])
          .nice();
      }, []);

    const makeYLines = useCallback(() => {
        return d3.axisLeft(yScale()).tickPadding(10).ticks(5);
    }, [yScale]);

    const renderGrid = useCallback(() => {
        const grid = configRef.current.chart
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(${[configRef.current.margin.left - 15, configRef.current.margin.top - 20]})`)
            .call(makeYLines().tickSize((-configRef.current.width + 90)));

        grid.selectAll('text')
            .attr('font-family', 'Space Mono')
            .attr('font-size', '12px');

    }, [makeYLines]);

    const createPaths = useCallback((chart, xScale, yScale, margin) => {
        const cat1color = '#8FD399';
        const cat2color = '#DC67CE';
        const cat3color = '#9657D5';

        const areaGroup = chart.selectAll()
            .data(data)
            .enter()
            .append('g');

        const areacat1 = d3.area()
            .curve(d3.curveCardinal)
            .x((d) => xScale(d.Xvalue))
            .y0(yScale(0))
            .y1((d) => yScale(d.cat1));

        areaGroup
            .append('path')
            .attr('class', 'area-cat-1 area-path')
            .attr('transform', `translate(${margin.left - 15}, ${margin.top - 20})`)
            .style('fill', () => cat1color)
            .attr('opacity', 0.1)
            .attr('d', () => areacat1(data))
            .on('mouseover', () => {
                d3.selectAll('.area-cat-1').attr('opacity', 0.25);
            }).on('mouseleave', () => {
                d3.selectAll('.area-path').attr('opacity', 0.1);
            });

        const areacat2 = d3.area()
            .curve(d3.curveCardinal)
            .x((d) => xScale(d.Xvalue))
            .y0(yScale(0))
            .y1((d) => yScale(d.cat2));
      
        areaGroup
            .append('path')
            .attr('class', 'area-cat-2 area-path')
            .attr('transform', `translate(${margin.left - 15}, ${margin.top - 20})`)
            .style('fill', () => cat2color)
            .attr('opacity', 0.1)
            .attr('d', () => areacat2(data))
            .on('mouseover', () => {
                d3.selectAll('.area-cat-2').attr('opacity', 0.25);
            }).on('mouseleave', () => {
                d3.selectAll('.area-path').attr('opacity', 0.1);
            });

        const areacat3 = d3.area()
            .curve(d3.curveCardinal)
            .x((d) => xScale(d.Xvalue))
            .y0(yScale(0))
            .y1((d) => yScale(d.cat3));
      
          areaGroup
            .append('path')
            .attr('class', 'area-cat-3 area-path')
            .attr('transform', `translate(${margin.left - 15}, ${margin.top - 20})`)
            .style('fill', () => cat3color)
            .attr('opacity', 0.1)
            .attr('d', () => areacat3(data))
            .on('mouseover', () => {
                d3.selectAll('.area-cat-3').attr('opacity', 0.25);
            }).on('mouseleave', () => {
                d3.selectAll('.area-path').attr('opacity', 0.1);
            });
    }, [])

    const renderGraph = useCallback((container) => {
        renderSVG(container);
        // renderXAxis();
        renderGrid();
        createPaths(configRef.current.chart, xScale(), yScale(), configRef.current.margin)
    }, [renderGrid, renderSVG, xScale, yScale, createPaths]);

    const graphContRef = useD3(renderGraph, [data.length]);

    return (
        <div className='density-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 0 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Density Chart</Typography>
            <div ref={graphContRef} className='density-chart__cont'></div>
        </div>
    )
}

export default DensityAreaChart;