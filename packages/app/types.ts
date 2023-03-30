export type WitResponse = {
  text: string;
  intents: Array<{
    id: string;
    name: string;
    confidence: number;
  }>;
  entities: {
    [k in string]: Array<{
      id: string;
      name: string;
      role: string;
      start: number;
      end: number;
      body: string;
      value: string;
      confidence: number;
      // entities: {};
      type?: string;
      from?: {
        grain: string;
        value: string;
      };
      to?: {
        grain: string;
        value: string;
      };
      values?: Array<{
        type: string;
        from: {
          grain: string;
          value: string;
        };
        to: {
          grain: string;
          value: string;
        };
      }>;
    }>;
  };
};
