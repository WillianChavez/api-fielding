import { WORKSPACE_ROUTE } from './workspace.route';
import { COLLABORATOR_ROUTE as COLLABORATOR_ROUTE_NAME } from './collaborator.route';

const MAIN_ROUTE = WORKSPACE_ROUTE;

export { MAIN_ROUTE };
export { WORKSPACE_ROUTE };
export const COLLABORATOR_ROUTE = `${MAIN_ROUTE}/${COLLABORATOR_ROUTE_NAME}`;
export const ROLE_ROUTE = `${COLLABORATOR_ROUTE}/role`;
