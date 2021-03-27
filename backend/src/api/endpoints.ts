import { EndpointsHandlers } from "./EndpointsHandlers"
import { authHandlers } from "./auth/handlers"

export const endpoints: EndpointsHandlers = {
  auth: authHandlers,
}
