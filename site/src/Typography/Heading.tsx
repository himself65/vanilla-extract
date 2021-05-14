import { ElementType, ReactNode } from 'react';
import classnames from 'classnames';

import * as styles from './typography.css';
import { Box } from '../system';
import { atoms, Atoms } from '../system/styles/atoms.css';

export type HeadingLevel = keyof typeof styles.heading;

const getHeadingComponent = (level: HeadingLevel) => {
  if (level === '1') {
    return 'h1';
  }
  if (level === '2') {
    return 'h2';
  }
  if (level === '3') {
    return 'h3';
  }
  if (level === '4') {
    return 'h4';
  }

  throw new Error('No valid heading level');
};

export interface HeadingProps {
  children: ReactNode;
  level: HeadingLevel;
  align?: Atoms['textAlign'];
  branded?: boolean;
  component?: ElementType;
}

export const useHeadingStyles = (
  level: HeadingLevel,
  branded?: boolean,
  align?: Atoms['textAlign'],
) =>
  classnames(
    branded ? styles.font.brand : styles.font.heading,
    atoms({
      textAlign: align,
      color: { lightMode: 'coolGray900', darkMode: 'gray100' },
    }),
    styles.heading[level].base,
    styles.heading[level].trims,
  );

export const Heading = ({
  level,
  component,
  branded = false,
  align,
  children,
}: HeadingProps) => {
  return (
    <Box
      component={component || getHeadingComponent(level)}
      className={useHeadingStyles(level, branded, align)}
    >
      {children}
    </Box>
  );
};