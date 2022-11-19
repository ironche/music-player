import { IconButton, IconButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ControlButton = styled((props: IconButtonProps) => {
  const { color, edge, size, ...rest } = props;
  return (
    <IconButton color="inherit" edge="start" size="medium" {...rest}>
      {props.children}
    </IconButton>
  );
})({
  '.MuiSvgIcon-root': {
    fontSize: '2.2rem',
  },
});
