import { getRequestType } from "ask-sdk-core";
import { defineRequestHandler } from "../utils";

export default defineRequestHandler({
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === "LaunchRequest";
  },
  handle(handlerInput) {
    const speakOutput = "How can I help?";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
});
