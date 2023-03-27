import { z } from "zod";

// type OptionalParamSchema = {
//   <R extends z.ZodTypeAny>(response: R): ReturnType<
//     typeof getBaseSchema<R, { team: ReturnType<typeof z.string> }>
//   >;
//   <R extends z.ZodTypeAny, P extends Record<string, z.ZodTypeAny>>(
//     response: R,
//     params: P
//   ): ReturnType<
//     typeof getBaseSchema<R, P & { team: ReturnType<typeof z.string> }>
//   >;
// };

export const getBaseSchema = <
  R extends z.ZodTypeAny,
  P extends Record<string, z.ZodTypeAny>
>(
  response: R,
  params: P
) =>
  z.object({
    get: z.string(),
    parameters: z.object(params),
    errors: z.array(z.unknown()),
    results: z.number(),
    paging: z.object({ current: z.number(), total: z.number() }),
    response,
  });

export const getSchemaWithTeam = <
  R extends z.ZodTypeAny,
  P extends Record<string, z.ZodTypeAny>
>(
  response: R,
  params: P = <P>{}
) => getBaseSchema(response, { team: z.string(), ...params });
