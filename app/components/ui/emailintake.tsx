const EmailIntake = () => {
    return (
        <div>
            <div className="inputName">Email Results</div>
            <div className="email-form">
                <input
                    type="checkbox"
                />
                <input
                    id="email-address"
                    type="text"
                    placeholder="Email Address"
                />
            </div>
        </div>
    );
}

export default EmailIntake;