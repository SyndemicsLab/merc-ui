import { useState } from "react";

const CollapsibleMenu = (
    { sectionName, context, contents, defaultState }:
        { sectionName: string, context: string, contents: any, defaultState: any }
) => {
    const [collapsed, setCollapsed] = useState(defaultState);

    return (
        <>
            <input
                id={`collapsed-${context}`}
                type="checkbox"
                value={collapsed}
                onChange={(event) => setCollapsed(event.target.checked)}
            />
            <label
                htmlFor={`collapsed-${context}`}
                className={`collapse-toggle ${collapsed ? "opened" : ""}`}
            >
                {sectionName}
            </label>
            <div className={collapsed ? "unhidden" : "hidden"}>{contents}</div>
        </>
    );
}

export default CollapsibleMenu;