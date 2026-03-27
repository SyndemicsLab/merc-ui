// module imports
import * as React from "react";
import { useFetcher } from "react-router";

// component imports

function TabButton ({ name }) {
    const fetcher = useFetcher();

    return(
        <>
            <fetcher.Form method="post">
                <button
                    aria-label={`Switch to ${name} tab`}
                    value={name}
                >
                    {name}
                </button>
            </fetcher.Form>
        </>
    )
}

export {
    TabButton
};
