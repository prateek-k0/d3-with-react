import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails, AccordionLinkButton } from '../../Common/Accordion';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';


export const barChartGroupId = 'bar-charts';

export const BarChartGroupAccordion = ({ expanded, onChange }) => {

    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary id={barChartGroupId}>
                <Typography>Bar Charts</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <nav aria-label="secondary mailbox folders">
                    <List sx={{ padding: '0'}}>
                        <ListItem disablePadding>
                            <AccordionLinkButton component={RouterLink} to="/bar-charts/bar-chart-1">
                                <ListItemText primary="Bar Chart 1" />
                            </AccordionLinkButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <AccordionLinkButton>
                                <ListItemText primary="Spam" />
                            </AccordionLinkButton>
                        </ListItem>
                    </List>
                </nav>
            </AccordionDetails>
        </Accordion>
    )
}