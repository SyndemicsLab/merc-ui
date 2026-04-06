import { Button } from "@components/ui/button";

const EmailIntake = () => {
    return (
        <div className="email-intake">
            <div className="email-form">
                <input
                    id="email-address"
                    type="text"
                    placeholder="Email Address"
                />
            </div>
            <Button className="email-send">Send</Button>
        </div>
    );
};

export default EmailIntake;
