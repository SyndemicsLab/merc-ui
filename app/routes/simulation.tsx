import System from "@components/simulation/system";
import Inputs from "@components/simulation/inputs";
import Disclaimers from "@components/simulation/disclaimers";
import ScrollIndicator from "@components/ui/scroll-indicator";

export default function Index() {
    return (
        <div id="simulation">
            <System />
	    <ScrollIndicator/>
            <hr />
	    <Inputs />
            <Disclaimers />
        </div>
    );
}
