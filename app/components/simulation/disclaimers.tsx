const Disclaimers = () => {
    const message = "The RESPOND model does not track movement at the individual level, and therefore should only be used for population-level analyses. The model is only as good as the data that is input into it, so please use data that you trust. Modeling is inherently imprecise, and while we stand by our results qualitatively, please do not assume outcomes to be exact. RESPOND cannot predict the future, but can simulate potential outcomes and provide insight for programming and economic investment.";
    return (
        <div id="disclaimers">
            <h3>Keep In Mind...</h3>
            <b className="warn">{message}</b>
        </div>
    );
}
export default Disclaimers;
