import { Form, useActionData, useNavigation } from "react-router";

type ContactActionResult = {
    ok?: boolean;
    error?: string;
};

const ContactUs = () => {
    const actionData = useActionData<ContactActionResult>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const startedAt = Date.now();

    return (
        <div className="contact-us-container">
            <h2 className="contact-us-title">Contact Us</h2>
            <p>
                Do you have questions, comments, or feedback on the model or the
                online tool? Reach out to us by sharing your email address and
                message below!
            </p>
            <Form method="post" className="contact-us-form" replace>
                <input
                    type="text"
                    className="contact-us-input"
                    name="name"
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    className="contact-us-input"
                    name="email"
                    placeholder="Email"
                    required
                />
                <textarea
                    className="contact-us-input contact-body"
                    name="message"
                    placeholder="Write here"
                    rows={5}
                    required
                />
                <div className="contact-honeypot" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input
                        id="company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                    />
                </div>
                <input type="hidden" name="startedAt" value={startedAt} />
                <button
                    type="submit"
                    className="contact-us-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Sending..." : "Submit"}
                </button>
                {actionData?.ok ? (
                    <p
                        className="contact-status contact-status-success"
                        role="status"
                    >
                        Thanks! Your message was sent.
                    </p>
                ) : null}
                {actionData?.error ? (
                    <p
                        className="contact-status contact-status-error"
                        role="alert"
                    >
                        {actionData.error}
                    </p>
                ) : null}
            </Form>
        </div>
    );
};

// Just button for email subscription for now

export default ContactUs;
