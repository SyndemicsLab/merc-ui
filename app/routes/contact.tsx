import type { ActionFunctionArgs } from "react-router";
import ContactUs from "@components/contact/contactus";
import "~/styles/contact.scss";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const honeypot = formData.get("company");
    const startedAtRaw = formData.get("startedAt");

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string"
    ) {
        return { ok: false, error: "Invalid form submission." };
    }

    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
        return { ok: false, error: "Please fill out all required fields." };
    }

    if (typeof honeypot === "string" && honeypot.trim() !== "") {
        return { ok: false, error: "Submission rejected." };
    }

    const startedAt = Number(startedAtRaw);
    if (Number.isFinite(startedAt)) {
        const elapsedMs = Date.now() - startedAt;
        if (elapsedMs < 3000) {
            return { ok: false, error: "Submission rejected." };
        }
    }

    if (typeof process.env.API_URL === "undefined") {
        return { ok: false, error: "Email service is not configured." };
    }

    try {
        const response = await fetch(`${process.env.API_URL}/email`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.API_KEY}`,
            },
            body: JSON.stringify({
                name: name.trim(),
                email: email.trim(),
                message: message.trim(),
                company: typeof honeypot === "string" ? honeypot : "",
                startedAt: Number.isFinite(startedAt) ? startedAt : undefined,
                submittedAt: Date.now(),
                page: "/contact",
            }),
        });

        if (!response.ok) {
            return {
                ok: false,
                error: "Unable to send your message right now. Please try again.",
            };
        }

        return { ok: true };
    } catch {
        return {
            ok: false,
            error: "Unable to send your message right now. Please try again.",
        };
    }
}

export default function Contact() {
    return (
        <div id="contact">
            <ContactUs />
        </div>
    );
}
