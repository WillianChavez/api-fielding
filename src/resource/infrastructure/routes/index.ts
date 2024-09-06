import { RESOURCE_ROUTE } from './resource.route';

const MAIN_ROUTE = RESOURCE_ROUTE;

export const REQUEST_ROUTE = `${MAIN_ROUTE}/request`;

export const HTTP_REQUEST_ROUTE = `${REQUEST_ROUTE}/http`;

export const PROJECT_RESOURCE_ROUTE = `${MAIN_ROUTE}/project`;

export { MAIN_ROUTE };
export { RESOURCE_ROUTE };
