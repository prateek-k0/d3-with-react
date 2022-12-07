import React, { useRef, useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const data = {
    report: '',
    color: '#fff',
    children: [
      {
        report: 'Test Report-1',
        value: 50,
        color: '#e8e6eb',
        children: [
          {
            report: 'Highly Similar',
            value: 10,
            color: 'rgb(163, 222, 247)',
          },
          {
            report: 'Duplicate',
            value: 20,
            color: 'rgb(100, 151, 249)',
          },
          {
            report: 'Subset',
            value: 20,
            color: 'rgb(114, 189, 250)',
          },
        ],
      },
      {
        report: 'Test Report-2',
        value: 45,
        color: '#e8e6eb',
        children: [
          {
            report: 'Subset',
            value: 5,
            color: 'rgb(114, 189, 250)',
          },
          {
            report: 'Highly Similar',
            value: 10,
            color: 'rgb(163, 222, 247)',
          },
          {
            report: 'Duplicate',
            value: 30,
            color: 'rgb(100, 151, 249)',
          },
        ],
      },
      {
        report: 'Test Report-3',
        value: 60,
        color: '#e8e6eb',
        children: [
          {
            report: 'Subset',
            value: 10,
            color: 'rgb(114, 189, 250)',
          },
          {
            report: 'Highly Similar',
            value: 20,
            color: 'rgb(163, 222, 247)',
          },
          {
            report: 'Duplicate',
            value: 30,
            color: 'rgb(100, 151, 249)',
          },
        ],
      },
    ],
};

const BasicCircularPacking = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);

    const configRef = useRef({
        selector: 'defects-package-chart-section',
        width: 600,
        height: 600,
        dataLength: 0,
        nodes: undefined,
        svg: undefined,
        rootNode: undefined
    });

    const renderSVG = useCallback((containerD3) => {
        configRef.current.svg = containerD3.append('svg')
            .attr('class', configRef.current.selector)
            .attr('height', configRef.current.height)
            .attr('width', configRef.current.width);
    }, []);

    const renderCircles = useCallback(() => {
        configRef.current.nodes = configRef.current.svg.append('g')
            .selectAll('g')
            .data(configRef.current.rootNode.descendants())
            .enter()
            .append('g')
            .attr('transform', (d) => `translate(${[d.x, d.y]})`);

        configRef.current.nodes
            .append('circle')
            .attr('r', (d) => (d.r))
            .attr('cx', (d) => {
              if (configRef.current.dataLength === 1) {
                if (data.children[0].children.length === 2) {
                  return -20;
                }
              }
              return d.children === undefined ? (d.r / 3) - 15 : 0;
            })
            .attr('cy', (d) => {
              if (configRef.current.dataLength === 1) {
                return 0;
              }
              return d.children === undefined ? (d.r / 3) - 12 : 0;
            })
            .attr('fill', (d) => {
                const outerFillColor = isDarkMode ? '#ffffff30' : '#00000040'
                return d.parent === null ? outerFillColor : d.data.color;
            })
    }, [isDarkMode]);

    const renderValues = useCallback(() => {
        configRef.current.nodes
          .append('text')
          .attr('dy', (d) => (d.children === undefined ? (d.r / 2) - 12 : d.r / 3))
          .attr('dx', (d) => (d.children === undefined ? (d.r / 2) - 20 : d.r / 1.3))
          .attr('fill', (d) => (d.children === undefined ? '#fff' : '#000'))
          .style('text-anchor', 'middle')
          .style('font-family', 'Space Mono')
          .attr('font-weight', 600)
          .style('font-size', (d) => (d.children === undefined ? d.r / 2.5 : '24px'))
          .text((d) => d.data.value);
      }, []);

    const renderFunc = useCallback((container) => {
        renderSVG(container);

        configRef.current.dataLength = data.children.length;
        const padding = data.children.length === 1 ? 0 : 20;
        const packLayout = d3.pack()
            .size([configRef.current.width, configRef.current.height])
            .padding(padding);
        configRef.current.rootNode = d3.hierarchy(data);
        configRef.current.rootNode.sum((d) => d.value);
        packLayout(configRef.current.rootNode);

        renderCircles();
        renderValues();
    }, [renderSVG, renderCircles, renderValues]);

    const graphContRef = useD3(renderFunc, [data], false);

    return (
        <div className='bubble-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Basic Circular Packing</Typography>
            <div ref={graphContRef} className='bubble-chart__cont'></div>
        </div>
    )
}

export default BasicCircularPacking;