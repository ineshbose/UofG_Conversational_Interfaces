import { getRequestType, getIntentName } from "ask-sdk-core";
import { defineRequestHandler, getResolvedSlot } from "../utils";

export default defineRequestHandler({
  canHandle(handlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      getIntentName(handlerInput.requestEnvelope) === "GetInfo"
    );
  },
  handle(handlerInput) {
    const team = getResolvedSlot(handlerInput.requestEnvelope, 'team').pop()
    const info = getResolvedSlot(handlerInput.requestEnvelope, 'info').map((i) => i.id)

    const speakOutput = `${team?.name || '[40x for Team Slot]'} - [Intents ${info}]`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
});
