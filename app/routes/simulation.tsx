import System from "@components/simulation/system";
import Inputs from "@components/simulation/inputs";
import Disclaimers from "@components/simulation/disclaimers";

export default function Index() {
    return (
        <div>
            <System />
            <hr />
	    <Inputs />
            <Disclaimers />
        </div>
    );
}
