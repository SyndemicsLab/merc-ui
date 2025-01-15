import { createCookie } from "@remix-run/node";

export const userPrefs = createCookie("user-prefs", {
    maxAge: 31449600, // one year
});