import React, { useCallback, useMemo } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { data } from './data'

const BubbleForceSimulation = () => {

    const transformData = useCallback(() => {
        const width = 800;
        const height = 600;
        return data.map((d) => ({
            ...d,
            r: d.Value > 1000 ? (d.Value / 30) : d.Value,
            x: width * 0.2,
            y: height,
          }));
    }, []);

    const dataDep = useMemo(() => ({ data }), []);
    
    const renderFunc = useCallback((containerD3) => {
        const selector = 'usage-analysi-container';
        const width = 650;
        const height = 500;
        const svg = containerD3.append('svg')
            .attr('class', selector)
            .attr('height', height)
            .attr('width', width);
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const centerScale = d3.scalePoint().padding(1).range([0, width]);
        const forceStrength = 0.02;
        let nodes = [];
        let lables = null;
        nodes = transformData();
        const centre = { x: width, y: height / 2 };
        let radiusFactor = 0.12;
        let rFactor = 0.09;
        if (nodes.length > 350) {
            radiusFactor = 0.09;
            rFactor = 0.07;
          } else if (nodes.length > 0 && nodes.length < 50) {
            radiusFactor = 0.05;
            rFactor = 0.04;
        }
        function charge(d) {
            return d.r ** 0.1 * 0.01;
        }
        const simulation = d3.forceSimulation()
            .force('charge', d3.forceManyBody().strength(charge))
            .force('collide', d3.forceCollide((d) => (d.r * radiusFactor)).iterations(5))
            .force('y', d3.forceY().y(centre.y))
            .force('x', d3.forceX().strength(forceStrength).x(centre.x));
      
        const elements = svg.selectAll('.bubble')
            .data(nodes, (d) => d.id)
            .enter()
            .append('g');

        const circles = elements
            .append('circle')
            .attr('r', (d) => d.r * rFactor)
            .style('fill', (d) => color(d.Value));

        lables = elements
            .append('text')
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .style('font-size', (d) => {
                let size = d.r / 4;
                size *= 1 / 4;
                if (size >= 100) {
                size -= 5;
                } else { size += 1; }
                return `${Math.round(size)}px`;
            })
            .text((d) => d.Value);

        function ticked() {
                circles
                  .attr('cx', (d) => d.x)
                  .attr('cy', (d) => d.y);
          
                lables
                  .attr('x', (d) => d.x)
                  .attr('y', (d) => d.y);
        }
          
        simulation
                .nodes(nodes)
                .on('tick', ticked);
          
        function hideTitles() {
                svg.selectAll('.title').remove();
        }

        function splitBubbles(byVar, data) {
            centerScale.domain(data.map((d) => d[byVar]));
      
            if (byVar === 'all') {
              hideTitles();
            }
      
            simulation.force('x', d3.forceX().strength(forceStrength).x((d) => centerScale(d[byVar])));
            simulation.alpha(2).restart();
        }
        splitBubbles('all', nodes);
    }, [transformData]);

    const graphContRef = useD3(renderFunc, dataDep, false);

    return (
        <div className='bubble-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Force Simulation Bubble Chart</Typography>
            <div ref={graphContRef} className='bubble-chart__cont'></div>
        </div>
    )
}

export default BubbleForceSimulation;