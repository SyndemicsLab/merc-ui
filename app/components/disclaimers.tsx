const Disclaimers = () => {
    const message = "RESPOND is calibrated to Massachusetts data. If attempting to use the model to characterize another jurisdiction, the user will need to provide data for said jurisdiction."
    return (
        <div id="disclaimers">
            <h3>Disclaimers</h3>
            <b className="warn">{message}</b>
        </div>
    );
}
export default Disclaimers;