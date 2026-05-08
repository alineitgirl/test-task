declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_COLLECTION_ID: string
  readonly VITE_PRODUCT_URL: string  
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
