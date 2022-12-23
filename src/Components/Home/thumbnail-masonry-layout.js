import React from "react";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import '@fontsource/abeezee/400.css'
// image imports
import arcDiagram from './chart-thumbnails/arc-diagram.png'
import arcMouseevents from './chart-thumbnails/arc-mouseevents.png'
import bubbleScatter from './chart-thumbnails/bubble-scatter.png'
import chordColored from './chart-thumbnails/chord-colored.png'
import choroplethMap from './chart-thumbnails/choropleth.png'
import contourDensity from './chart-thumbnails/contour-density.png'
import countryMap from './chart-thumbnails/country-map.png'
import density from './chart-thumbnails/density.png'
import donut from './chart-thumbnails/donut.png'
import dottedBar from './chart-thumbnails/dotted-bar.png'
import heatmapTooltip from './chart-thumbnails/heatmap-tooltip.png'
import hexbinDensity from './chart-thumbnails/hexbin-density.png'
import histogramDouble from './chart-thumbnails/histogram-double.png'
import lineGradient from './chart-thumbnails/line-gradient.png'
import lineMultiple from './chart-thumbnails/line-multiple.png'
import PiePercDist from './chart-thumbnails/pie-perc-distribution.png'
import scatter from './chart-thumbnails/scatter.png'
import sunburst from './chart-thumbnails/sunburst.png'
import treemap from './chart-thumbnails/treemap.png'
import zoomableBubble from './chart-thumbnails/zoomable-bubble.png'

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: 0,
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    borderRadius: 0,
    '&:hover' : {
        '.thumbnail-backdrop' : {
            opacity: 1,
        }
    }
}));

const imageList = [
    { img: arcDiagram, link: '/arc-diagrams/arc-diagram-basic', title: 'Arc diagram basic' },
    { img: arcMouseevents, link: '/arc-diagrams/arc-diagram-mouse', title: 'Arc diagram with mouse events' },
    { img: bubbleScatter, link: '/bubble-charts/bubble-scatter-plot', title: 'Bubble scatter plot' },
    { img: chordColored, link: '/pie-charts/chord-colored', title: 'Chord chart colored' },
    { img: choroplethMap, link: '/maps/choropleth', title: 'Choropleth map' },
    { img: contourDensity, link: '/area-charts/contour-density', title: 'Contour Density' },
    { img: density, link: '/area-charts/density-chart', title: 'Density' },
    { img: countryMap, link: '/maps/country-map-india', title: 'Country map - India' },
    { img: donut, link: '/pie-charts/donut-chart', title: 'Donut' },
    { img: dottedBar, link: '/bar-charts/dotted-bar-chart', title: 'Dotted bar chart' },
    { img: heatmapTooltip, link: '/heatmaps/heatmap-with-tooltip', title: 'Heatmap with tooltip' },
    { img: hexbinDensity, link: '/area-charts/hexbin-density', title: 'Hexbin density' },
    { img: histogramDouble, link: '/histograms/double-histogram', title: 'Double Histogram' },
    { img: lineGradient, link: '/line-charts/line-chart-gradient', title: 'Line chart with gradient' },
    { img: lineMultiple, link: '/line-charts/multi-line', title: 'Multi-line chart' },
    { img: PiePercDist, link: '/pie-charts/pie-chart-perc-distribution', title: 'Pie chart - percentage distribution' },
    { img: scatter, link: '/scatter-plots/scatter-plot-basic', title: 'Scatter plot' },
    { img: sunburst, link: '/pie-charts/sunburst-chart', title: 'Sunburst' },
    { img: treemap, link: '/treemaps/basic', title: 'Treemap' },
    { img: zoomableBubble, link: '/bubble-charts/circular-pack-zoom', title: 'Zoomable bubble chart' },
]

const ThumbnailMasonry = () => {
    const isDarkMode = useSelector(state => state.theme.darkMode);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '25px 0 5px', backgroundColor: isDarkMode ? '#ffffff1f' : '#0000001f', maxWidth: '1040px', width: '1040px', flex: '0 0 1040px', justifySelf: 'center', borderRadius: '8px'}}>
            <Box sx={{ width: '100%', maxWidth: '1010px', display: 'flex', justifyContent: 'center' }}>
                <Masonry columns={3} spacing={2}>
                {imageList.map((imgItem, index) => (
                    <Item key={index}>
                        <Link to={imgItem.link} style={{textDecoration: 'none', color: '#fff', position: 'relative', flex: '0 0 320px', width: '320px', maxWidth: '320px'}}>
                            <img
                                src={imgItem.img}
                                alt={'graph'}
                                style={{
                                    borderRadius: 0,
                                    display: 'block',
                                    width: '320px',
                                }}
                            />
                            <div className="thumbnail-backdrop">
                                <Typography sx={{fontSize: '20px', fontFamily: '"ABeeZee", sans-serif'}}>{imgItem.title}</Typography>
                            </div>
                        </Link>
                    </Item>
                ))}
                </Masonry>
            </Box>
        </div>
    )
};

export default ThumbnailMasonry;