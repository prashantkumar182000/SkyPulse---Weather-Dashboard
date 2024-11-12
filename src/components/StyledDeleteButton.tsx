// components/StyledDeleteButton.tsx
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  zIndex: 2,
}));

export default StyledDeleteButton;
