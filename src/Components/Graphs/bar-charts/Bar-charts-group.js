import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails, AccordionLinkButton } from '../../Common/Accordion';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink as RouterLink } from 'react-router-dom';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';

export const barChartGroupId = 'bar-charts';

export const BarChartGroupAccordion = ({ expanded, onChange }) => {

    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary id={barChartGroupId}>
                <Typography>Bar Charts</Typography>
            </AccordionSummary>
            <AccordionDetails>
                    <List sx={{ padding: '0'}}>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/bar-charts/bar-chart-1" >
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Bar Chart 1" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/bar-charts/stacked-bar-chart" >
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Stacked Bar Chart" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/bar-charts/clustered-bar-chart" >
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Clustered Bar Chart" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/bar-charts/horizontal-bar-chart" >
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Horizontal Bar Chart" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/bar-charts/dotted-bar-chart" >
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Dotted Bar Chart" />
                            </AccordionLinkButton>
                        </ListItem>
                    </List>
            </AccordionDetails>
        </Accordion>
    )
}