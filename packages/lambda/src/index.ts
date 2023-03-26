import { SkillBuilders } from "ask-sdk-core";
import { requestHandlers, errorHandlers } from "./intents";

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
export const handler = SkillBuilders.custom()
  .addRequestHandlers(...requestHandlers)
  .addErrorHandlers(...errorHandlers)
  .withCustomUserAgent("sample/hello-world/v1.2")
  .lambda();
