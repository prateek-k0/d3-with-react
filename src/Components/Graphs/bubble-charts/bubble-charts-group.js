import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails, AccordionLinkButton } from '../../Common/Accordion';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink as RouterLink } from 'react-router-dom';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';

export const bubbleChartGroupId = 'bubble-charts';

export const BubbleChartGroupAccordion = ({ expanded, onChange }) => {
    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary id={bubbleChartGroupId}>
                <Typography>Bubble Charts</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{ padding: '0'}}>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/bubble-charts/circular-packing-basic">
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Basic Circular Packing" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/bubble-charts/circular-pack-zoom">
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Zoomable Circular Packing" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/bubble-charts/bubble-force-simulation">
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Bubble Force Simulation" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/bubble-charts/bubble-scatter-plot">
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Bubble Scatter Plot" />
                            </AccordionLinkButton>
                        </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
    )
}