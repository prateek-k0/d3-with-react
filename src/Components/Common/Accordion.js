import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import '@fontsource/space-mono/400.css';
import ListItemButton from '@mui/material/ListItemButton';

export const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} TransitionProps={{ unmountOnExit: true }}/>
  ))(({ theme }) => ({
    width: '100%',
    '& .Mui-expanded': {
      '& .MuiAccordionSummary-content': {
        opacity: 1,
        color: theme.palette.mode === 'dark' ? '#44bbff' : '#0099ff'
      },
      '& .MuiSvgIcon-root': {
        opacity: 1,
        color: theme.palette.mode === 'dark' ? '#44bbff' : '#0099ff'
      },
    },
    '& .MuiAccordionSummary-content': {
      opacity: 0.6
    },
    '& .MuiSvgIcon-root': {
      opacity: 0.6
    },
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
}));

export const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<PlayArrowOutlinedIcon sx={{ fontSize: '1.2rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    padding: '12px',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.145)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
      '& > .MuiTypography-root' : {
        fontSize: '16px',
        fontFamily: '"Space Mono", monospace'
      },
    },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: 0,
    // borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const AccordionLinkButton = styled((props) => (
  <ListItemButton {...props} />
))(({ theme }) => ({
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingTop: '12px',
  paddingBottom: '12px',
  '&:hover': {
      transition: '0.15s ease-in',
  }
}));