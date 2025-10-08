import createHttpRequest from './createHttpRequest';

const httpRequest = createHttpRequest(import.meta.env.VITE_BACKEND_API);

export default httpRequest;
