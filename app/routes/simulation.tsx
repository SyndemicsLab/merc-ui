import System from "@components/simulation/system";
import Inputs from "@components/simulation/inputs";
import { InputProvider } from "@components/input-contexts";

export async function action({ request }: Route.ActionArgs) {
    const bodyParams = await request.formData();

    const formJson = Object.fromEntries(bodyParams.entries());
    console.log(formJson);
}

export default function Index() {
    return (
        <InputProvider>
            <div id="simulation">
                <System />
                <Inputs />
            </div>
        </InputProvider>
    );
}
