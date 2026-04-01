// module imports
import * as React from "react";

// component imports

function TabButton ({ name, id, className }) {
    return(
        <button
            className={className}
            aria-label={`Switch to ${name} tab`}
            name="active_intervention_id"
            value={id}
        >
            {name}
        </button>
    );
}

export {
    TabButton
};
