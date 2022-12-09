import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Divider } from '../Common/Divider';
import ListItem from '@mui/material/ListItem';
import { useSelector, useDispatch } from 'react-redux';
import { getSidebarStatus } from '../../Store/sidebarSlice';
import { toggleOrSetSidebar } from '../../Store/sidebarSlice';
import styled from '@emotion/styled';
// component imports
import { barChartGroupId, BarChartGroupAccordion } from '../Graphs/bar-charts/Bar-charts-group';
import { pieChartGroupId, PieChartGroupAccordion } from '../Graphs/pie-charts/Pie-charts-group';
import { areaChartGroupId, AreaChartGroupAccordion } from '../Graphs/area-charts/Area-charts-group';
import { bubbleChartGroupId, BubbleChartGroupAccordion } from '../Graphs/bubble-charts/bubble-charts-group';
import { scatterPlotsGroupId, ScatterPlotsGroupAccordion } from '../Graphs/scatter-plots/scatter-plots-group';
import { arcChartsGroupId, ArcChartsGroupAccordion } from '../Graphs/arc-charts/arc-charts-group';

const DrawerComponent = styled((props) => (
  <Drawer {...props} />
))(({ theme }) => ({
  '.MuiDrawer-paperAnchorLeft': {
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '10px'
    },
    '&::-webkit-scrollbar-track': {
        // boxShadow: theme.palette.mode === 'dark' ? 'inset 0 0 7px #ffffff90' : 'inset 0 0 7px #00000080',
        opacity: 0
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'darkgrey',
    },
  }
}));

export default function SidebarDrawer() {
  const sideBarStatus = useSelector(getSidebarStatus);
  const dispatch = useDispatch();
  const [expandedAcc, setExpandedAcc] = useState(false);
  
  const handleChange = useCallback((panelKey) => (event, isExpanded) => {
    setExpandedAcc(isExpanded ? panelKey : false);
  }, []);

  useEffect(() => {
    // console.log(expandedAcc);
  }, [expandedAcc])

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List sx={{padding: 0}}>
        <ListItem key={areaChartGroupId} sx={{padding: 0}}>
            <AreaChartGroupAccordion expanded={expandedAcc === areaChartGroupId} onChange={handleChange(areaChartGroupId)} />
        </ListItem>
        <Divider />
        <ListItem key={barChartGroupId} sx={{padding: 0}}>
            <BarChartGroupAccordion expanded={expandedAcc === barChartGroupId} onChange={handleChange(barChartGroupId)} />
        </ListItem>
        <Divider />
        <ListItem key={pieChartGroupId} sx={{padding: 0}}>
            <PieChartGroupAccordion expanded={expandedAcc === pieChartGroupId} onChange={handleChange(pieChartGroupId)} />
        </ListItem>
        <Divider />
        <ListItem key={bubbleChartGroupId} sx={{padding: 0}}>
            <BubbleChartGroupAccordion expanded={expandedAcc === bubbleChartGroupId} onChange={handleChange(bubbleChartGroupId)} />
        </ListItem>
        <Divider />
        <ListItem key={scatterPlotsGroupId} sx={{padding: 0}}>
            <ScatterPlotsGroupAccordion expanded={expandedAcc === scatterPlotsGroupId} onChange={handleChange(scatterPlotsGroupId)} />
        </ListItem>
        <Divider />
        <ListItem key={arcChartsGroupId} sx={{padding: 0}}>
            <ArcChartsGroupAccordion expanded={expandedAcc === arcChartsGroupId} onChange={handleChange(arcChartsGroupId)} />
        </ListItem>
        <Divider />
      </List>
    </Box>
  );

  return (
        <DrawerComponent anchor='left' open={sideBarStatus} onClose={() => dispatch(toggleOrSetSidebar(false))}>
            {list()}
        </DrawerComponent>
  );
}
