import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails, AccordionLinkButton } from '../../Common/Accordion';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink as RouterLink } from 'react-router-dom';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';

export const treemapsGroupId = 'maps';

export const TreemapsGroupAccordion = ({ expanded, onChange }) => {
    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary id={treemapsGroupId}>
                <Typography>Treemaps</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{ padding: '0'}}>
                    <ListItem disablePadding>
                        <AccordionLinkButton component={RouterLink} to="/treemaps/basic">
                            <TripOriginOutlinedIcon sx={{fontSize: '12px'}}/>
                            <ListItemText primary="Treemap Basic" />
                        </AccordionLinkButton>
                    </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
    )
}
