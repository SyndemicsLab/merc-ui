import System from "../components/simulation/system";
import { GeneralInputs } from "../components/simulation/inputs";
import Disclaimers from "~/components/disclaimers";
import AdvancedInputs from "~/components/simulation/advancedinputs";
import EmailIntake from "~/components/ui/emailintake";

export default function Index() {
    const population = 214000;
    const uptake = 5000;

    return (
        <div>
            <System />
            <hr />
            <div id="inputs">
                <h1>Inputs & Advanced Options</h1>
                <GeneralInputs population={population} uptake={uptake} />
                <AdvancedInputs />
                <EmailIntake />
                <label id="run">
                    <div className="run-text"><span>▶ RUN</span></div>
                </label>
            </div>
            <Disclaimers />
        </div>
    );
}
