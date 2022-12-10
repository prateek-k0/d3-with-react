import React, { useRef, useCallback, useMemo } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const data = {
    name: '',
    children: [
      {
        name: 'query',
        color: '#004dff',
        children: [
          {
            name: 'SD',
            value: 13896,
          },
        ],
      },
      {
        name: 'util',
        color: '#46BDF0',
        children: [
          {
            name: 'SD',
            value: 8258,
          },
          {
            name: 'MD',
            value: 19118,
          },
          {
            name: 'CD',
            value: 22026,
          },
        ],
      },
      {
        name: 'vis',
        color: '#E370B3',
        children: [
          {
            name: 'SD',
            value: 1000,
          },
          {
            name: 'MD',
            value: 30000,
          },
          {
            name: 'CD',
            value: 30000,
          },
          {
            name: 'AD',
            value: 20000,
          },
        ],
      },
    ],
};

const SunburstChart = () => {
    const configRef = useRef({
        selector: 'sun-burst-chart',
        width: 650,
        height: 450,
        svg: undefined,
        rootNode: undefined,
        radius: 150,
        color: undefined,
    }); 

    const dataDep = useMemo(() => ({ data }), []);

    const isDarkMode = useSelector(state => state.theme.darkMode);

    const renderSVG = useCallback((containerD3) => {
        configRef.current.svg = containerD3.append('svg')
            .attr('class', configRef.current.selector)
            .attr('height', configRef.current.height)
            .attr('width', configRef.current.width)
            .attr('viewBox', `${-(configRef.current.width / 2)} ${-(configRef.current.height / 2)} ${configRef.current.width} ${configRef.current.height}`);
    }, []);

    const transformData = useCallback(() => {
        const partitionLayout = d3.partition()
            .size([2 * Math.PI, configRef.current.radius]);
        configRef.current.rootNode = d3.hierarchy(data)
            .sum((d) => d.value);
        partitionLayout(configRef.current.rootNode);
    }, []);

    const getPie = useCallback(() => {
        return d3.pie()
            .value((d) => d.value)
            .sort(null);
    }, []);

    const getPieArc = useCallback(() => {
        return d3.arc()
            .innerRadius((d) => d.data.y1 + 28)
            .outerRadius((d) => d.data.y1 + 28);
    }, []);

    const midAngle = useCallback((d) => d.startAngle + (d.endAngle - d.startAngle) / 2, [])

    const renderArc = useCallback(() => {
        const arcGenerator = d3.arc()
            .startAngle((d) => d.x0)
            .endAngle((d) => d.x1)
            .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.05))
            .padRadius(configRef.current.radius / 2)
            .innerRadius((d) => d.y0)
            .outerRadius((d) => d.y1 - 2);

        const format = d3.format(',d');

        configRef.current.svg.append('g')
            .selectAll('path')
            .data(configRef.current.rootNode.descendants().filter((d) => d.depth))
            .join('path')
            .attr('fill', (d) => { let dataItem = d; while (dataItem.depth > 1) { dataItem = dataItem.parent; } return dataItem.data.color; })
            .attr('d', arcGenerator)
            .attr('fill-opacity', 1)
            .append('title')
            .text((d) => `${d.ancestors().map((dataItem) => dataItem.data.name).reverse().join('/')}\n${format(d.value)}`);
    }, []);

    const renderDataTitle = useCallback(() => {
        const pie = getPie();
        const data = configRef.current.rootNode.descendants().filter((d) => d.depth > 1);
        const labelArc = getPieArc();
        configRef.current.svg.append('g')
          .selectAll('text')
          .data(pie(data))
          .join('text')
          .text((d) => d.data.data.name)
          .attr('transform', (d) => {
            const pos = labelArc.centroid(d);
            pos[0] = (d.data.y1 + 50) * (midAngle(d) < Math.PI ? 1 : -1);
            pos[1] -= 11;
            return `translate(${pos})`;
          })
          .attr('pointer-events', 'none')
          .attr('text-anchor', 'middle')
          .attr('font-size', '14')
          .attr('font-family', 'Space Mono')
          .attr('fill', isDarkMode ? '#fff' : '#000')
          .attr('dy', '15')
          .style('text-anchor', (d) => (midAngle(d) < Math.PI ? 'start' : 'end'));
    }, [getPie, getPieArc, midAngle, isDarkMode]);

    const renderLegendLines = useCallback(() => {
        const arc = d3.arc()
            .innerRadius((d) => d.data.y0)
            .outerRadius((d) => d.data.y1 + 40);
        const pie = getPie();
        const data = configRef.current.rootNode.descendants().filter((d) => d.depth > 1);
        const outerArc = getPieArc();

        configRef.current.svg.append('g')
            .selectAll('lines')
            .data(pie(data))
            .join('polyline')
            .attr('opacity', '1')
            .attr('stroke', '#707070')
            .attr('stroke-width', '1px')
            .attr('stroke-dasharray', '1')
            .attr('fill', 'none')
            .attr('points', (d) => {
                const innerPos = arc.centroid(d);
                const pos = outerArc.centroid(d);
                pos[0] = (d.data.y1 + 40) * (midAngle(d) < Math.PI ? 1 : -1);
                return [innerPos, outerArc.centroid(d), pos];
            });
    }, [getPie, getPieArc, midAngle]);

    const renderLegendMarkers = useCallback(() => {
        const pie = getPie();
        const data = configRef.current.rootNode.descendants().filter((d) => d.depth > 1);
        const circleArc = getPieArc();

        configRef.current.svg.append('g')
            .selectAll('circles')
            .data(pie(data))
            .join('circle')
            .attr('transform', (d) => {
                const pos = circleArc.centroid(d);
                pos[0] = (d.data.y1 + 40) * (midAngle(d) < Math.PI ? 1 : -1);
                return `translate(${pos})`;
            })
            .attr('r', '4')
            .attr('class', 'legendSmallCircle')
            .attr('cx', (d) => d.x0)
            .attr('cy', (d) => d.y0)
            .attr('fill', (d) => d.data.parent.data.color);
    }, [getPie, getPieArc, midAngle])

    const renderFunc = useCallback((containerD3) => {
        transformData();
        renderSVG(containerD3);
        renderArc();
        renderDataTitle();
        renderLegendLines();
        renderLegendMarkers();
    }, [renderArc, renderSVG, renderDataTitle, transformData, renderLegendLines, renderLegendMarkers]);

    const graphContRef = useD3(renderFunc, dataDep, false);

    return (
        <div className='pie-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Sunburst Chart</Typography>
            <div ref={graphContRef} className='pie-chart__cont'></div>
        </div>
    )
}

export default SunburstChart;