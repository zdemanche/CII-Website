/** Build-time environment. Evaluated in Node during `astro build`. */
export const DEMO = process.env.DEMO === '1';
export const RFQ_ENDPOINT = process.env.PUBLIC_RFQ_ENDPOINT ?? '';
export const BUILD_YEAR = new Date().getFullYear();
