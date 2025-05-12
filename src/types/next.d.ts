declare module 'next/navigation' {
  export function usePathname(): string;
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    forward: () => void;
  };
  export function useSearchParams(): URLSearchParams;
  export function redirect(url: string): never;
}

declare module 'next/link' {
  import { ComponentProps, ReactNode } from 'react';
  export interface LinkProps extends Omit<ComponentProps<'a'>, 'href'> {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    legacyBehavior?: boolean;
    onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
    onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }
  const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
  export default Link;
}

declare module 'next/image' {
  import { ComponentProps, ReactElement } from 'react';
  export interface ImageProps extends ComponentProps<'img'> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    loader?: (props: { src: string; width: number; quality?: number }) => string;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    unoptimized?: boolean;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    quality?: number;
    sizes?: string;
  }
  export default function Image(props: ImageProps): ReactElement;
}

declare module 'next/font/google' {
  interface FontOptions {
    weight?: string | string[];
    style?: string | string[];
    subsets?: string[];
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
    variable?: string;
  }

  export function Inter(options: FontOptions): {
    className: string;
    style: { fontFamily: string };
    variable?: string;
  };

  export function Poppins(options: FontOptions): {
    className: string;
    style: { fontFamily: string };
    variable?: string;
  };

  export function Amiri(options: FontOptions): {
    className: string;
    style: { fontFamily: string };
    variable?: string;
  };
} 