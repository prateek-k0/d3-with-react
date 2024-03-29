import React, { useCallback, useMemo } from 'react';
import { useD3 } from './../Common/Hooks/useD3'
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

const HomepageLogo = ({ dimHeight, renderHeight, canvasColor }) => {
    const isDarkMode = useSelector(state => state.theme.darkMode);
    const height = (renderHeight || 512);
    const width = (renderHeight || 512);

    const accentColors = useMemo(() => ['#ff00cf', '#00c0ff'], []);

    const renderPieChart = useCallback((svg) => {
        const pieChartGroup = svg.append('g')
            .attr('transform', `translate(${width / 2.22}, ${height / 2})`)
            .attr('class', 'pie-chart-group');

        const pieChartData = [
            { value: 30, radius: 20, fill: accentColors[0] },
            { value: 10, radius: 0, fill: accentColors[1] },
            { value: 20, radius: 10, fill: accentColors[0] },
        ];
        const radius = (height / 2) - 50;
        const arc = d3.arc()
            .innerRadius(radius - 20)
            .outerRadius((d) => radius + d.data.radius)
            .padAngle(0.025)
        const arcInner = d3.arc()
            .innerRadius(radius - 35)
            .outerRadius(radius - 30)
            .padAngle(0.03)
        const pie = d3.pie()
            .value((d) => d.value)
            .sort(null)
            .startAngle(0)
            .endAngle(-Math.PI);
        const pieGroup = pieChartGroup
            .selectAll('path')
            .data(pie(pieChartData))
            .enter()
            .append('g');

        pieGroup
            .append('path')
            .attr('d', arc)
            // .attr('fill', isDarkMode ? '#fff' : '#000');
            .attr('fill', (d) => d.data?.fill);
        pieChartGroup
            .append('g')
            .selectAll('path')
            .data(pie([pieChartData[0]]))
            .enter()
            .append('path')
            .attr('d', arcInner)
            .attr('fill', isDarkMode ? '#fff' : '#000');

        const bubbleGroup = pieChartGroup
            .append('g')
            .attr('class', 'bubble-chart-group')
        const bubbleRadius = radius / 2;
        bubbleGroup.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', bubbleRadius)
            .attr('fill', isDarkMode ? '#ffffff20' : '#00000020');

        bubbleGroup.append('circle')
            .attr('cx', -bubbleRadius / 2.5)
            .attr('cy', -bubbleRadius / 4)
            .attr('r', bubbleRadius / 4)
            .attr('stroke-width', 4)
            // .attr('stroke', isDarkMode ? '#fff' : '#000')
            .attr('stroke', accentColors[1])
            .attr('fill', 'transparent');

        bubbleGroup.append('circle')
            .attr('cx', -bubbleRadius / 2)
            .attr('cy', bubbleRadius / 3)
            .attr('r', bubbleRadius / 8)
            .attr('stroke-width', 4)
            // .attr('stroke', isDarkMode ? '#fff' : '#000')
            .attr('stroke', accentColors[0])
            .attr('fill', 'transparent');

        bubbleGroup.append('circle')
            .attr('cx', -bubbleRadius / 40)
            .attr('cy', bubbleRadius / 3)
            .attr('r', bubbleRadius / 5)
            .attr('stroke-width', 4)
            // .attr('stroke', isDarkMode ? '#fff' : '#000')
            .attr('stroke', accentColors[1])
            .attr('fill', 'transparent');
    
    }, [isDarkMode, height, width, accentColors]);

    const renderBarChart = useCallback((svg) => {
        const barChartGroup = svg.append('g')
            .attr('transform', `translate(${width / 2.22}, ${0})`)
            .attr('class', 'bar-chart-group');

        const barChartData = [
            {label: 1, value: 15},
            {label: 2, value: 30, fill: accentColors[1]},
            {label: 3, value: 20},
            {label: 4, value: 40},
        ]

        const xOffset = 5, yOffset = 80;
        barChartGroup.append('rect')
            .attr('class', 'bar-canvas-rect')
            .attr('x', -xOffset / 2)
            .attr('y', yOffset)
            .attr('width', height - (3 * yOffset) + xOffset)
            .attr('height', height - 2 * yOffset)
            .attr('fill', canvasColor ? canvasColor : (isDarkMode ? '#121212' : '#fff'))

        const axesLines = barChartGroup.append('g')
            .attr('class', 'axes-lines');
        axesLines.append('line')
            .attr('x1', xOffset)
            .attr('y1', height - yOffset)
            .attr('x2', xOffset)
            .attr('y2', yOffset)
            .attr('stroke', isDarkMode ? '#fff' : '#000')
            .attr('stroke-width', 5);
        axesLines.append('line')
            .attr('x1', xOffset)
            .attr('y1', height - yOffset - 2.5)
            .attr('x2', height - (3 * yOffset) + xOffset)
            .attr('y2', height - yOffset - 2.5)
            .attr('stroke', isDarkMode ? '#fff' : '#000')
            .attr('stroke-width', 5);

        const xScale = d3.scaleBand()
            .domain(barChartData.map(d => d.label))
            .range([0, height - (3 * yOffset) + xOffset])
            .padding(0.4)
            .paddingOuter(0.55);
        const yScale =  d3
            .scaleLinear()
            .domain([0, 80])
            .rangeRound([height - yOffset, yOffset]);

        const lineGen = d3.line()
            .x((d) => xScale(d.label) + xScale.bandwidth() / 2)
            .y((d) =>  yScale(d.value + 10));
        barChartGroup
            .append('path')
            .attr('d', lineGen(barChartData))
            .attr('fill', 'none')
            // .attr('stroke', isDarkMode ? '#fff' : '#000')
            .attr('stroke', accentColors[1])
            .attr('stroke-width', 4);

        const barGroups = barChartGroup.append('g')
            .attr('class', 'bar-group')
        const barRectGroup = barGroups
            .selectAll('rect.bar')
            .data(barChartData)
            .enter()
            .append('g');
        barRectGroup.append('rect')
            .attr('class', 'bar')
            // .attr('fill', isDarkMode ? '#fff' : '#000')
            .attr('fill', accentColors[0])
            .attr('x', (d) => xScale(d.label))
            .attr('width', xScale.bandwidth())
            .attr('y', (d) => yScale(d.value))
            .attr('height', (d) => yScale(0) - yScale(d.value) - 10)
            .attr('rx', 6)
            .attr('ry', 6);
        barRectGroup.append('circle')
            .attr('class', 'market')
            // .attr('stroke', isDarkMode ? '#fff' : '#000')
            .attr('stroke', accentColors[1])
            .attr('stroke-width', 4)
            .attr('fill', canvasColor ? canvasColor : (isDarkMode ? '#121212' : '#fff'))
            .attr('r', 10)
            .attr('cx', (d) => xScale(d.label) + xScale.bandwidth() / 2)
            .attr('cy', (d) => yScale(d.value + 10));

    }, [isDarkMode, height, width, accentColors, canvasColor]);

    const renderFunc = useCallback((container) => {
        const scaleDim = (dimHeight / renderHeight);
        const offset = (renderHeight - dimHeight)
        const svg = container
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('transform', `translate(${(-offset) * scaleDim}, ${(-offset) * scaleDim}) scale(${scaleDim})`);
        renderPieChart(svg);
        renderBarChart(svg);
    }, [height, width, renderPieChart, renderBarChart, renderHeight, dimHeight]);

    const graphRef = useD3(renderFunc, null, false);

    return (
        <div ref={graphRef} style={{width: dimHeight, height:  dimHeight}}></div>
    );
}

export default HomepageLogo;