import { getRequestType, getIntentName } from "ask-sdk-core";
import { defineRequestHandler, getResolvedSlot } from "../utils";

/**
 * This is the main intent for football-agent.
 */
export default defineRequestHandler({
  canHandle({ requestEnvelope }) {
    return (
      getRequestType(requestEnvelope) === "IntentRequest" &&
      getIntentName(requestEnvelope) === "GetInfo"
    );
  },
  handle({ requestEnvelope, responseBuilder }) {
    // const locale = getLocale(requestEnvelope)
    const team = getResolvedSlot(requestEnvelope, 'team').pop()
    const info = getResolvedSlot(requestEnvelope, 'info').map((i) => i.id)

    const speakOutput = `${team?.name || '[40x for Team Slot]'} - [Intents ${info}]`;

    return responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
});
