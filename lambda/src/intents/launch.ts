import { getRequestType } from 'ask-sdk-core';
import { defineRequestHandler } from "../utils";

export default defineRequestHandler({
  canHandle(handlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput =
      "Welcome, you can say Hello or Help. Which would you like to try?";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
});
