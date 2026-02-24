/*
 * File: sessions.server.ts
 * Project: merc-ui
 * Created Date: 2026-02-24
 * Author: Matthew Carroll
 * -----
 * Last Modified: 2026-02-24
 * Modified By: Matthew Carroll
 * -----
 * Copyright (c) 2026 Syndemics Lab at Boston Medical Center
 */

import { createCookieSessionStorage } from "react-router";

type SessionData = {
    uuid: string;
};

type SessionFlashData = {
    error: string;
};

const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
        name: "__session",
        domain: process.env.NODE_ENV === "production" ? "respond.syndemicslab.org" : undefined,
        httpOnly: true, // don't show the cookie in the browser dev tools
        maxAge: 60 * 60 * 24 * 7, // 60 seconds * 60 minutes * 24 hours * 7 days = 1 week
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production" // Only use https in production
    }
});

export { getSession, commitSession, destroySession };