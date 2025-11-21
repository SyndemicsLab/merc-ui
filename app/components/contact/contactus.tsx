import * as React from "react";

const ContactUs = () => {
    return (
        <div className="contact-us-container">
            <h2 className="contact-us-title">Contact Us</h2>
            <p>
                Do you have questions, comments, or feedback on the model or the online tool? Reach out to us by sharing your email address and message below!
            </p>
            <form className="contact-us-form">
                <input
                    type="text"
                    className="contact-name"
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    className="contact-us-input"
                    placeholder="Email"
                    required
                />
                <textarea
                    className="contact-body"
                    placeholder="Write here"
                    rows={5}
                    required
                />
                <button type="submit" className="contact-us-button">Submit</button>
            </form>
        </div>
    );
};

// Just button for email subscription for now

export default ContactUs;
