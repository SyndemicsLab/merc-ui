import System from "@components/simulation/system";
import Inputs from "@components/simulation/inputs";

export default function Index() {
    return (
        <div id="simulation">
            <System />
            <hr />
	    <Inputs />
        </div>
    );
}
