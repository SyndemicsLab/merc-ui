import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";

import ContactPage, { action } from "../../app/routes/contact";

const ContactStub = createRoutesStub([
    {
        path: "/contact",
        Component: ContactPage,
    },
]);

function createContactRequest(overrides: Record<string, string> = {}) {
    const params = new URLSearchParams();
    params.set("name", "Jane Doe");
    params.set("email", "jane.doe@example.org");
    params.set("message", "Hello from the contact form.");
    params.set("company", "");
    params.set("startedAt", String(Date.now() - 5000));

    for (const [key, value] of Object.entries(overrides)) {
        params.set(key, value);
    }

    return new Request("http://localhost/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
    });
}

function createContactActionArgs(overrides: Record<string, string> = {}) {
    const request = createContactRequest(overrides);

    return {
        request,
        params: {},
        context: {},
        url: new URL(request.url),
        pattern: "/contact",
    };
}

afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.API_URL;
    delete process.env.API_KEY;
});

describe("ContactUs Test suite", () => {
    it("renders the contact form with the expected fields", () => {
        render(<ContactStub initialEntries={["/contact"]} />);

        expect(screen.getByText(/contact us/i)).toBeTruthy();
        expect(screen.getByPlaceholderText("Name")).toBeTruthy();
        expect(screen.getByPlaceholderText("Email")).toBeTruthy();
        expect(screen.getByPlaceholderText("Write here")).toBeTruthy();
        expect(screen.getByRole("button", { name: /submit/i })).toBeTruthy();
    });

    it("forwards a valid submission to the email API", async () => {
        process.env.API_URL = "https://api.example.org";
        process.env.API_KEY = "test-key";

        const fetchMock = vi.fn().mockResolvedValue({ ok: true });
        vi.stubGlobal("fetch", fetchMock);

        const response = await action(
            createContactActionArgs() as Parameters<typeof action>[0],
        );

        expect(response).toEqual({ ok: true });
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            "https://api.example.org/email",
            expect.objectContaining({
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "test-key",
                },
            }),
        );
    });

    it("rejects submissions when the honeypot is filled", async () => {
        process.env.API_URL = "https://api.example.org";
        process.env.API_KEY = "test-key";

        const fetchMock = vi.fn();
        vi.stubGlobal("fetch", fetchMock);

        const response = await action(
            createContactActionArgs({ company: "Acme Corp" }) as Parameters<
                typeof action
            >[0],
        );

        expect(response).toEqual({ ok: false, error: "Submission rejected." });
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("rejects submissions that arrive too quickly", async () => {
        process.env.API_URL = "https://api.example.org";
        process.env.API_KEY = "test-key";

        const fetchMock = vi.fn();
        vi.stubGlobal("fetch", fetchMock);
        vi.spyOn(Date, "now").mockReturnValue(1_000_000);

        const response = await action(
            createContactActionArgs({
                startedAt: String(999_000),
            }) as Parameters<typeof action>[0],
        );

        expect(response).toEqual({ ok: false, error: "Submission rejected." });
        expect(fetchMock).not.toHaveBeenCalled();
    });
});
