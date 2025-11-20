import * as React from "react";
import System from "@components/simulation/system";
import Inputs from "@components/simulation/inputs";
import type { Route } from "./+types/home";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    console.log(formData);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
}

export default function Index() {
    return (
        <main id="simulation">
            <System />
            <Inputs />
        </main>
    );
}
