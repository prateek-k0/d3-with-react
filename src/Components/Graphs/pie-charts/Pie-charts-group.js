import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails, AccordionLinkButton } from '../../Common/Accordion';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink as RouterLink } from 'react-router-dom';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';

export const pieChartGroupId = 'pie-charts';

export const PieChartGroupAccordion = ({ expanded, onChange }) => {

    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary id={pieChartGroupId}>
                <Typography>Pie & Chord Charts</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{ padding: '0'}}>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/pie-charts/pie-chart-labels" >
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Pie Chart With Labels" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/pie-charts/pie-chart-perc-distribution" >
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Pie Chart Percentage Distribution" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/pie-charts/donut-chart" >
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Donut Chart" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/pie-charts/sunburst-chart" >
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Sunburst Chart" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/pie-charts/zoomable-sunburst" >
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Zoomable Sunburst Chart" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/pie-charts/chord-colored" >
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Chord Chart Colored" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/pie-charts/chord-labeled" >
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Chord Chart labeled" />
                            </AccordionLinkButton>
                        </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
    )
}