import React, { useRef, useCallback, useMemo } from 'react';
import { useD3 } from '../../../Common/Hooks/useD3';
import * as d3 from 'd3';
import '@fontsource/space-mono/400.css';
import '@fontsource/abeezee/400.css'
import { Typography } from '@mui/material';

const data = [
    { country: 'Peru', cases: 638 },
    { country: 'Bulgaria', cases: 534 },
    { country: 'Hungary', cases: 478 },
    { country: 'Czechia', cases: 374 },
    { country: 'Romania', cases: 342 },
    { country: 'Brazil', cases: 310 },
    { country: 'Poland', cases: 307 },
    { country: 'Chile', cases: 299 },
    { country: 'US', cases: 298 },
    { country: 'Argentina', cases: 281 },
    { country: 'Greece', cases: 278 },
    { country: 'Colombia', cases: 273 },
    { country: 'Italy', cases: 269 },
    { country: 'Belgium', cases: 269 },
    { country: 'Paraguay', cases: 260 },
    { country: 'Ukraine', cases: 259 },
    { country: 'UK', cases: 255 },
    { country: 'Russia', cases: 252 },
    { country: 'Mexico', cases: 249 },
    { country: 'Tunisia', cases: 239 },
];

const DottedBarChart = () => {
    const configRef = useRef({
        margin: {
            top: 50, bottom: 50, left: 40, right: 100,
        },
        dotRadius: 2,
        bandPadding: 2,
        itemsPerDot: 8,
        leftTickWidth: 80,
        rightTickWidth: 80,
        barPaddingInner: 0.1,
        dotRowPadding: 8,
        barPaddingOuter: 4,
        dotsPerRow: 0,
        selector: 'dotted-bar-chart',
        width: 440,
        height: 600,
        svg: undefined,
        chart: undefined
    });

    const dataDep = useMemo(() => ({ data }), []);

    const renderSVG = useCallback((containerD3) => {
        const contHeight = 700;
        configRef.current.height = contHeight - configRef.current.margin.top - configRef.current.margin.bottom;
        configRef.current.svg = containerD3.append('svg')
            .attr('class', configRef.current.selector)
            .attr('height', configRef.current.height + configRef.current.margin.top + configRef.current.margin.bottom)
            .attr('width', configRef.current.width);

        configRef.current.chart = configRef.current.svg
            .append('g')
            .attr('transform', `translate(${configRef.current.margin.left},${configRef.current.margin.top / 2})`);
    }, []);

    const yScale = useCallback(() => {
        const countryList = data.map((item) => item.country);
        return d3.scaleBand()
            .domain(countryList)
            .range([configRef.current.height, 0])
            .paddingInner(configRef.current.barPaddingInner)
            .align(0.5);
    }, [])

    const xScale = useCallback(() => {
        const barWidth = configRef.current.width - (configRef.current.rightTickWidth + configRef.current.leftTickWidth) - 2 * configRef.current.barPaddingOuter;
        configRef.current.dotsPerRow = parseInt(`${barWidth / ((configRef.current.dotRadius * 2) + (configRef.current.bandPadding * 2))}`, 10);
        return d3.scaleBand()
            .domain(d3.range(1, configRef.current.dotsPerRow + 1).map((item) => `${item}`))
            .range([0, barWidth])
            .paddingOuter(0.5)
            .align(0.5);
    }, []);

    const renderYAxis = useCallback(() => {
        configRef.current.chart.append('g')
        .attr('class', 'axis y-axis left')
        .style('font-family', 'Graphik')
        .attr('transform', `translate(${configRef.current.leftTickWidth}, ${0})`)
        .call(d3.axisLeft(yScale()).tickSizeInner(10).tickSizeOuter(0))
        .call((d) => d.selectAll('line').attr('stroke-opacity', 0))
        .call((d) => d.select('path.domain').attr('stroke', '#aaa'))
        .call((d) => d.selectAll('text')
            .attr('font-family', 'Space Mono')
            .attr('font-weight', 400)
            .attr('font-size', '12px'));

        configRef.current.chart.append('g')
        .attr('class', 'axis-values-right-cont')
        .selectAll('text.axis-values-right')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'axis-values-right')
        .attr('font-family', 'Space Mono')
        .attr('font-weight', 400)
        .attr('font-size', '12px')
        .attr('fill', '#44bbff')
        .attr('transform', (d) => `translate(${configRef.current.width - configRef.current.rightTickWidth}, ${yScale()(d.country) + yScale().bandwidth() / 2})`)
        .text((d) => d.cases);
    }, [yScale]);

    const renderDotMatrix = useCallback(() => {
        const rowContainer = configRef.current.chart
        .append('g')
        .attr('class', 'dot-rows')
        .attr('transform', `translate(${configRef.current.leftTickWidth}, 0)`);
        rowContainer.selectAll('g.dot-matrix-row')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'dot-matrix-row')
        .each((d,i,nodes) => {
            const totalDots = Math.ceil(d.cases / configRef.current.itemsPerDot);
            const addDotsInRow = (row, numberOfDots = configRef.current.dotsPerRow) => {
                d3.select(nodes[i])
                    .selectAll(`.group${i + 1}-dots-row${row + 1}`)
                    .data(d3.range(1, numberOfDots + 1))
                    .enter()
                    .append('circle')
                    .attr('class', `dots-row${row + 1}`)
                    .attr('r', configRef.current.dotRadius)
                    .attr('stroke', '#a100ff')
                    .attr('fill', '#a100ff')
                    .attr('cx', (dataItem) => xScale()(`${dataItem}`) + xScale().bandwidth() / 2)
                    .attr('cy', (row * configRef.current.dotRowPadding));
            };
            xScale();
            if (totalDots % configRef.current.dotsPerRow === 0) {
            const numberOfRows = totalDots / configRef.current.dotsPerRow;
            for (let row = 0; row < numberOfRows; addDotsInRow(row++));
            } else {
            const numberOfRows = Math.floor(totalDots / configRef.current.dotsPerRow);
            let row;
            for (row = 0; row < numberOfRows; addDotsInRow(row++));
            // for remaining dots:
            addDotsInRow(row, totalDots % configRef.current.dotsPerRow);
            }
            const verticalOffset = (yScale().bandwidth() - d3.select(nodes[i]).node().getBBox().height) / 2;
            d3.select(nodes[i])
            .attr('transform', `translate(${0}, ${yScale()(d.country) + verticalOffset})`);
        });
    }, [xScale, yScale]);

    const renderFunc = useCallback((cont) => {
        renderSVG(cont);
        renderYAxis();
        renderDotMatrix();
    }, [renderDotMatrix, renderSVG, renderYAxis]);

    const graphContRef = useD3(renderFunc, dataDep, false);

    return (
        <div className='dotted-bar-chart__wrapper'>
            <Typography sx={{fontSize: '24px', padding: '16px 0 20px 36px', fontWeight: '700', fontFamily: '"ABeeZee", sans-serif'}}>Dotted Bar Chart</Typography>
            <div ref={graphContRef} className='dotted-bar-chart__cont'></div>
        </div>
    );
}

export default DottedBarChart;