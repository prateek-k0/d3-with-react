import { styled } from '@mui/material/styles';
import MuiDivider from '@mui/material/Divider';

export const Divider = styled(MuiDivider)(({ theme }) => ({
    borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.20)' : 'rgba(0, 0, 0, 0.20)',
}));