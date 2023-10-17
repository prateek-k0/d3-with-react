import React, { useRef, useCallback, useMemo } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { pageTransitionConfig } from '../../../Common/AnimationConfig';


const data = [
    {
      Xvalue: 'Jan\'22',
      cat: '1000',
    },
    {
      Xvalue: 'Feb\'22',
      cat: '800',
    },
    {
      Xvalue: 'Mar\'22',
      cat: '1600',
    },
    {
      Xvalue: 'Apr\'22',
      cat: '1200',
    },
];

const FilledAreaChart = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);
    const configRef = useRef({
        selector: 'curved-area-fill',
        svg: undefined,
        width: 100,
        height: 100,
        margin: {
            top: 50, bottom: 50, left: 50, right: 100,
        },
        chart: undefined,
        lines: undefined    
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
            .attr('transform', `translate(${configRef.current.margin.left},${configRef.current.margin.top / 2})`);
    }, []);
    
    const xScale = useCallback(() => {
        return d3.scaleBand()
            .range([0, configRef.current.width])
            .domain(data.map((d) => d.Xvalue))
            .paddingOuter(0)
            .paddingInner(0)
            .align(0.5);
    }, []);

    const yScale = useCallback(() => {
        // const yMaxVal = d3.max(data, (d) => +d.cat);
        return d3.scaleLinear()
        .rangeRound([configRef.current.height, 0])
        .domain([0, 3000])
        .nice();
    }, []);

    const makeYLines = useCallback(() => {
        return d3.axisLeft(yScale()).tickPadding(10)
        .ticks(5);
    }, [yScale]);

    const renderXAxis = useCallback(() => {
        configRef.current.chart.append('g')
            .attr('transform', `translate(0, ${configRef.current.height + 10})`)
            .call(d3.axisBottom(xScale()).tickSizeOuter(0))
            .call((d) => {
                d.selectAll('path').remove();
                d.selectAll('line').remove();
                d.selectAll('text')
                .attr('font-family', 'Space Mono')
                .attr('font-weight', 400)
                .attr('font-size', '12px')
                .attr('dy', 30);
            });
    }, [xScale]);

    const renderGrid = useCallback(() => {
        const grid = configRef.current.chart.append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(${[configRef.current.margin.left - 15, configRef.current.margin.top - 50]})`)
            .call(makeYLines().tickSize((-configRef.current.width + 90)))
            .selectAll('.tick:not(:first-child)')
            .select('line')
            .attr('opacity', '0.2');
        grid.selectAll('text')
            .attr('font-family', 'Space Mono')
            .attr('font-weight', 400)
            .attr('font-size', '10px');
    }, [makeYLines]);

    const createPaths = useCallback(() => {
        // set gradients
        const areaGradient = configRef.current.svg.append('defs')
            .append('linearGradient')
            .attr('id', 'areaGradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '0%')
            .attr('y2', '100%');
    
        areaGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#eb44ff')
            .attr('stop-opacity', 1);
        areaGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', isDarkMode ? '#000' : '#fff')
            .attr('stop-opacity', 0.3);

          // const dummyNode = {
          //   cat: 0,
          //   type: 'origin'
          // };
          const lineData = [...data];
          // lineData.unshift(dummyNode);
          const areaGroup = configRef.current.chart
            // .selectAll()
            // .data(lineData)
            // .enter()
            .append('g');
      
          const areacat = d3.area()
            .curve(d3.curveCardinal)
            .x((d) => {
              if (d.type && d.type === 'origin') return xScale()(data[0].Xvalue) + configRef.current.margin.left - 15;
              return xScale()(d.Xvalue) + xScale().bandwidth() / 2;
            })
            .y0(yScale()('0'))
            .y1((d) => yScale()(d.cat));
      
          const lineGenerator = d3.area()
            .x((d) => {
              if (d.type && d.type === 'origin') return xScale()(data[0].Xvalue) + configRef.current.margin.left - 15;
              return xScale()(d.Xvalue) + xScale().bandwidth() / 2;
            })
            .y((d) => ((d.type && d.type === 'origin') ? yScale()(0) : yScale()(d.cat)))
            .curve(d3.curveCardinal);

          areaGroup
            .append('path')
            .attr('transform', `translate(${0}, ${0})`)
            .attr('stroke-width', 2)
            .style('fill', 'url(#areaGradient)')
            .attr('d', () => areacat(lineData));

          areaGroup
            .append('path')
            .attr('transform', `translate(${0}, ${0})`)
            .attr('d', () => lineGenerator(lineData))
            .attr('stroke', '#9230a6')
            .attr('stroke-width', 3)
            .attr('fill', 'none');

          areaGroup.append('line')
            .attr('x1', xScale()(data[0].Xvalue) + xScale().bandwidth() / 2)
            .attr('x2', xScale()(data[0].Xvalue) + xScale().bandwidth() / 2)
            .attr('y1', configRef.current.height)
            .attr('y2', yScale()(data[0].cat))
            .attr('stroke', '#eb44ff')
            .attr('stroke-width', '1')
            .attr('stroke-dasharray', '5 3')

          areaGroup.append('line')
            .attr('x1', xScale()(data[data.length - 1].Xvalue) + xScale().bandwidth() / 2)
            .attr('x2', xScale()(data[data.length - 1].Xvalue) + xScale().bandwidth() / 2)
            .attr('y1', configRef.current.height)
            .attr('y2', yScale()(data[data.length - 1].cat))
            .attr('stroke', '#eb44ff')
            .attr('stroke-width', '1')
            .attr('stroke-dasharray', '5 3')
      
    }, [xScale, yScale, isDarkMode])

    const renderFunc = useCallback((cont) => {
        renderSVG(cont);
        renderXAxis();
        renderGrid();
        createPaths();
    }, [renderGrid, renderSVG, renderXAxis, createPaths]);

    const dataDep = useMemo(() => ({ data }), [])
    const graphContRef = useD3(renderFunc, dataDep);

    return (
        <motion.div className='filled-area-chart__wrapper' variants={pageTransitionConfig}
        initial="start"
        animate="animate"
        exit="end">
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Filled Area Chart</Typography>
            <div ref={graphContRef} className='filled-area-chart__cont'></div>
        </motion.div>
    )
}

export default FilledAreaChart;