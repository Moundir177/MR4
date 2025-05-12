declare module 'framer-motion' {
  import * as React from 'react';

  export interface AnimatePresenceProps {
    children: React.ReactNode;
    initial?: boolean;
    exitBeforeEnter?: boolean;
    onExitComplete?: () => void;
    custom?: any;
  }

  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    variants?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    custom?: any;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
    layoutId?: string;
    children?: React.ReactNode;
  }

  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLDivElement>>;
    span: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLSpanElement>>;
    p: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLParagraphElement>>;
    button: React.ForwardRefExoticComponent<MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>>;
    svg: React.ForwardRefExoticComponent<MotionProps & React.SVGAttributes<SVGElement>>;
    path: React.ForwardRefExoticComponent<MotionProps & React.SVGAttributes<SVGPathElement>>;
    // Add other HTML elements as needed
  };

  export const AnimatePresence: React.FunctionComponent<AnimatePresenceProps>;
} 