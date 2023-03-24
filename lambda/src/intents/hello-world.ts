import { getRequestType, getIntentName } from 'ask-sdk-core';
import { defineRequestHandler } from "../utils";

export default defineRequestHandler({
  canHandle(handlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      getIntentName(handlerInput.requestEnvelope) === "HelloWorldIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Hello World!";

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        // .reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
});
