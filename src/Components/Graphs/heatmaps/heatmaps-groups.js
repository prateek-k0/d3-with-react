import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails, AccordionLinkButton } from '../../Common/Accordion';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink as RouterLink } from 'react-router-dom';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';

export const heatmapsGroupId = 'heatmaps';

export const HeatmapsGroupAccordion = ({ expanded, onChange }) => {
    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary id={heatmapsGroupId}>
                <Typography>Heatmaps</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{ padding: '0'}}>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/heatmaps/basic">
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Heatmap Basic" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/heatmaps/heatmap-with-tooltip">
                                <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                                <ListItemText primary="Heatmap with tooltip" />
                            </AccordionLinkButton>
                        </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
    )
}
