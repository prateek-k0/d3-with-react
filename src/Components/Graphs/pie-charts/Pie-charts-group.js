import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails } from '../../Common/Accordion';

export const pieChartGroupId = 'pie-charts';

export const PieChartGroupAccordion = ({ expanded, onChange }) => {

    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary id="pie-charts">
                <Typography>Pie Charts</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}