// TypeScript support for imagetools
// https://github.com/JonasKruckenberg/imagetools/issues/160#issuecomment-1009292026

declare module '*?avif' {
  const image: string;
  export default image;
}

declare module '*?webp' {
  const image: string;
  export default image;
}
