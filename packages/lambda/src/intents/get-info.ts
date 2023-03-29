import { getRequestType, getIntentName } from "ask-sdk-core";
import { getInfo, type InfoType } from "agent-api";
import { defineRequestHandler, getResolvedSlot } from "../utils";
import { API_FOOTBALL_KEY } from "../../../../env";

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
  async handle({ requestEnvelope, responseBuilder, attributesManager }) {
    // const locale = getLocale(requestEnvelope)
    const sessionAttributes = attributesManager.getSessionAttributes<{
      current_team: ReturnType<typeof getResolvedSlot>[number] | undefined;
    }>();

    console.log(sessionAttributes);

    const team =
      getResolvedSlot(requestEnvelope, "team").pop() ||
      sessionAttributes.current_team;

    const info = getResolvedSlot(requestEnvelope, "info").map(
      (i) => i.id
    ) as InfoType[];

    sessionAttributes.current_team = team;

    const speakOutput = team
      ? ((await getInfo({ team, info }, API_FOOTBALL_KEY)) as string)
      : "What team?";

    return responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
});
