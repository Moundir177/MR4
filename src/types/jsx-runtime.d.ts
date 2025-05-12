declare module 'react/jsx-runtime' {
  export default {} as {};
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: React.ReactFragment;
}

declare module 'react/jsx-dev-runtime' {
  export default {} as {};
  export const jsxDEV: any;
  export const Fragment: React.ReactFragment;
} 