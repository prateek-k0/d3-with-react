import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails, AccordionLinkButton } from '../../Common/Accordion';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink as RouterLink } from 'react-router-dom';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';

export const arcChartsGroupId = 'arc-charts';

export const ArcChartsGroupAccordion = ({ expanded, onChange }) => {
    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary id={arcChartsGroupId}>
                <Typography>Arc Diagrams</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{ padding: '0'}}>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/arc-diagrams/arc-diagram-basic">
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Arc Diagram Basic" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/arc-diagrams/arc-diagram-vertical">
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Arc Diagram Vertical" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/arc-diagrams/arc-diagram-mouse">
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Arc Diagram with mouse events" />
                            </AccordionLinkButton>
                        </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
    )
}