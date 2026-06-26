import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";
const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    shield({ mode: "DRY_RUN" }),
    detectBot({
      mode: "DRY_RUN", // Log only, don't block
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:MONITOR",
        "CATEGORY:PREVIEW",
      ],
    }),
    slidingWindow({
      mode: "DRY_RUN",
      max: 100,
      interval: 60,
    }),
  ],
});

export default aj;