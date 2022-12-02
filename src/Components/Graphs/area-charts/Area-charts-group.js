import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails, AccordionLinkButton } from '../../Common/Accordion';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink as RouterLink } from 'react-router-dom';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';

export const areaChartGroupId = 'area-charts';

export const AreaChartGroupAccordion = ({ expanded, onChange }) => {

    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary id={areaChartGroupId}>
                <Typography>Area Charts</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <nav aria-label="secondary mailbox folders">
                    <List sx={{ padding: '0'}}>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/area-charts/area-chart-1">
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Area Chart 1" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/area-charts/density-chart">
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Density Chart" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/area-charts/filled-area">
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Filled Area Chart" />
                            </AccordionLinkButton>
                        </ListItem>
                    </List>
                </nav>
            </AccordionDetails>
        </Accordion>
    )
}