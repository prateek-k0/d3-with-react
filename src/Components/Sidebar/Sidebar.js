import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Divider } from '../Common/Divider';
import ListItem from '@mui/material/ListItem';
import { useSelector, useDispatch } from 'react-redux';
import { getSidebarStatus } from '../../Store/sidebarSlice';
import { toggleOrSetSidebar } from '../../Store/sidebarSlice';
import { barChartGroupId, BarChartGroupAccordion } from '../Graphs/bar-charts/Bar-charts-group';
import { pieChartGroupId, PieChartGroupAccordion } from '../Graphs/pie-charts/Pie-charts-group';

export default function SidebarDrawer() {
  const sideBarStatus = useSelector(getSidebarStatus);
  const dispatch = useDispatch();
  const [expandedAcc, setExpandedAcc] = useState(false);
  
  const handleChange = useCallback((panelKey) => (event, isExpanded) => {
    setExpandedAcc(isExpanded ? panelKey : false);
  }, []);

  useEffect(() => {
    console.log(expandedAcc);
  }, [expandedAcc])

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List sx={{padding: 0}}>
        <ListItem key={barChartGroupId} sx={{padding: 0}}>
            <BarChartGroupAccordion expanded={expandedAcc === barChartGroupId} onChange={handleChange(barChartGroupId)} />
        </ListItem>
        <Divider />
        <ListItem key={pieChartGroupId} sx={{padding: 0}}>
            <PieChartGroupAccordion expanded={expandedAcc === pieChartGroupId} onChange={handleChange(pieChartGroupId)} />
        </ListItem>
        <Divider />
      </List>
    </Box>
  );

  return (
    <div>
        <Drawer anchor='left' open={sideBarStatus} onClose={() => dispatch(toggleOrSetSidebar(false))}>
            {list()}
        </Drawer>
    </div>
  );
}
