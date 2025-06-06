import { createCookie } from "react-router";

export const userPrefs = createCookie("user-prefs", {
    maxAge: 31449600, // one year
});