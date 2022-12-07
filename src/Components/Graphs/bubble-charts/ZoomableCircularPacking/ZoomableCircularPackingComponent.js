import React, { useRef, useCallback } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';
import { data } from './data';

const ZoomableCircularPacking = () => {
    const configRef = useRef({
        width: 400,
        height: 350,
        absHeight: 0,
        absWidth: 0,
        svg: undefined,
        dataLength: undefined,
        rootNode: undefined,
        selector: 'bubble-chart-packing-zoomable',
        root: undefined,
        focus: undefined,
        view: undefined,
        node: undefined,
        margin: {
            top: 20,
            bottom: 20,
            right: 20,
            left: 20
        },
        label: undefined
    }); 

    const prepareData = useCallback(() => {
        const pack = d3.pack()
            .size([configRef.current.width, configRef.current.height])
            .padding(3);
        configRef.current.root = d3.hierarchy(data);
        configRef.current.root.sum((d) => d.value);
        configRef.current.focus = configRef.current.root;
        pack(configRef.current.root);
    }, []);

    const colorScale = useCallback(() => {
        return d3.scaleLinear()
            .domain([0, 5])
            .range(['#e3f9fc', '#9b15bc'])
            .interpolate(d3.interpolateHcl);
    }, []);

    const zoomTo = useCallback((v) => {
        const k = configRef.current.absWidth / v[2];
        configRef.current.view = v;
        configRef.current.label.attr('transform', (_d) => `translate(${(_d.x - v[0]) * k},${(_d.y - v[1]) * k})`);
        configRef.current.node.attr('transform', (_d) => `translate(${(_d.x - v[0]) * k},${(_d.y - v[1]) * k})`);
        configRef.current.node.attr('r', (_d) => _d.r * k);
    }, [])

    const zoom = useCallback((event, d) => {
        configRef.current.focus = d;
        let self;
        const transition = configRef.current.svg.transition()
            .duration(700)
            .tween('zoom', () => {
                const i = d3.interpolateZoom(configRef.current.view, [configRef.current.focus.x, configRef.current.focus.y, configRef.current.focus.r * 2.5]);
                return (t) => zoomTo(i(t));
            });

        configRef.current.label
            .filter((_d, i, arr) => {
                self = d3.select(arr[i]);
                return _d.parent === configRef.current.focus || self.style.display === 'inline';
            })
            .transition(transition)
            .attr('font-size', (_d) => `${(_d.r / 4) + _d.depth}px`)
            .style('fill-opacity', (_d) => (_d.parent === configRef.current.focus ? 1 : 0))
            .on('start', (_d) => { if (_d.parent === configRef.current.focus) self.style.display = 'inline'; });

        event.stopPropagation();
    }, [zoomTo]);

    const renderSVG = useCallback((container) => {
        const {
            top, bottom, left, right
        } = configRef.current.margin;
        configRef.current.absHeight = configRef.current.height - (top + bottom);
        configRef.current.absWidth = configRef.current.width - (left + right);

        configRef.current.svg = container
        .append('svg')
        .attr('viewBox', `-${configRef.current.absWidth / 2} -${configRef.current.absHeight / 2} ${configRef.current.absWidth} ${configRef.current.absHeight}`)
        .style('display', 'block')
        .style('margin', '0 -14px')
        // .style('background', colorScale()(0))
        .style('cursor', 'pointer')
        .on('click', (event) => zoom(event, configRef.current.root));
    }, [zoom]);

    const renderNodes = useCallback(() => {
        configRef.current.node = configRef.current.svg
            .append('g')
            .selectAll('circle')
            .data(configRef.current.root.descendants().slice(1))
            .join('circle')
            .attr('fill', (d) => (d.children ? colorScale()(d.depth) : '#fff'))
            .attr('pointer-events', (d) => (!d.children ? 'none' : null))
            .on('mouseover', (event) => {
                const target = event.currentTarget;
                d3.select(target).attr('stroke', '#000');
            })
            .on('mouseout', (event) => {
                const target = event.currentTarget;
                d3.select(target).attr('stroke', null);
            })
            .on('click', (event, d) => configRef.current.focus !== d && (zoom(event, d)));
    }, [colorScale, zoom]);

    const renderLabels = useCallback(() => {
        configRef.current.label = configRef.current.svg.append('g')
            .style('font', 'Space Mono')
            .attr('pointer-events', 'none')
            .attr('text-anchor', 'middle')
            .selectAll('text')
            .data(configRef.current.root.descendants())
            .join('text')
            .text((d) => d.data.name)
            .style('font-family', 'Space Mono')
            .style('font-weight', 600)
            .attr('font-size', (_d) => `${_d.r / 4}px`)
            .style('fill-opacity', (_d) => (_d.parent === configRef.current.focus ? 1 : 0));
    }, []);

    const renderFunc = useCallback((container) => {
        prepareData();
        renderSVG(container);
        renderNodes();
        renderLabels();
        zoomTo([configRef.current.root.x, configRef.current.root.y, configRef.current.root.r * 2.5]);
    }, [renderLabels, renderSVG, renderNodes, prepareData, zoomTo]);

    const graphContRef = useD3(renderFunc, [data], true);

    return (
        <div className='bubble-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Zoomable Circular Packing</Typography>
            <div ref={graphContRef} className='bubble-chart__cont'></div>
        </div>
    )
}

export default ZoomableCircularPacking;
