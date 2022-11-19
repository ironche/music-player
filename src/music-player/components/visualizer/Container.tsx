import { PropsWithChildren } from 'react';
import { styled, CSSObject } from '@mui/material/styles';

interface ContainerProps extends PropsWithChildren {
  animate: boolean;
  colors?: string[];
}

export const Container = styled((props: ContainerProps) => {
  return (<section {...props}/>);
}, {
  shouldForwardProp(prop) {
    let keys: Array<keyof ContainerProps> = ['animate', 'colors'];
    return keys.every((k) => prop !== k);
  },
})((props) => {
  let colors = ['#fff', '#000'];
  if (Array.isArray(props.colors)) {
    const len = props.colors.length;
    if (len > 1) {
      colors = props.colors;
    } else if (len === 1) {
      colors[0] = props.colors[0];
    }
  }

  let styles: CSSObject = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: `linear-gradient(-45deg, ${colors.join(', ')})`,
    backgroundSize: '600% 600%',
  };

  if (props.animate) {
    Object.assign(styles, {
      animation: 'WalkingBackground 6s ease infinite',
    } as CSSObject);
  }

  return styles;
});
