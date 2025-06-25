import System from "@components/simulation/system";
import Inputs from "@components/simulation/inputs";

export async function action({ request }: Route.ActionArgs) {
    const bodyParams = await request.formData();

    const formJson = Object.fromEntries(bodyParams.entries());
    console.log(formJson);
}

export default function Index() {
    return (
        <div id="simulation">
	    <System />
	    <Inputs />
        </div>
    );
}
