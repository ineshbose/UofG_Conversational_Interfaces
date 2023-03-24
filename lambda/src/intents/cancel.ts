import { getRequestType, getIntentName } from 'ask-sdk-core';
import { defineRequestHandler } from "../utils";

export default defineRequestHandler({
  canHandle(handlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speakOutput = "Goodbye!";

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
});
