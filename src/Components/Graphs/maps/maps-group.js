import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails, AccordionLinkButton } from '../../Common/Accordion';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink as RouterLink } from 'react-router-dom';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';

export const mapsGroupId = 'maps';

export const MapsGroupAccordion = ({ expanded, onChange }) => {
    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary id={mapsGroupId}>
                <Typography>Maps</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{ padding: '0'}}>
                    <ListItem disablePadding>
                        <AccordionLinkButton component={RouterLink} to="/maps/basic">
                            <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                            <ListItemText primary="Map Basic" />
                        </AccordionLinkButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <AccordionLinkButton component={RouterLink} to="/maps/choropleth">
                            <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                            <ListItemText primary="Choropleth map" />
                        </AccordionLinkButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <AccordionLinkButton component={RouterLink} to="/maps/country-map-india">
                            <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                            <ListItemText primary="Country Map - India" />
                        </AccordionLinkButton>
                    </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
    )
}
