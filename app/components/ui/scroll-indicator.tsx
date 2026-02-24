import { Link } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export enum ScrollDirection {
    Up = 0,
    Down = 1,
}

const icons: Record<ScrollDirection, IconDefinition> = {
    0: faChevronUp,
    1: faChevronDown,
};

interface ScrollIndicatorProps {
    visible?: boolean;
    direction?: ScrollDirection;
}

export default function ScrollIndicator({
    destination,
    options = {},
}: {
    destination: string;
    options?: ScrollIndicatorProps;
}) {
    // handling default values
    const { visible = true, direction = ScrollDirection.Down } = options;
    return (
        <>
            <Link to={destination}>
                <div className={`scrolldown${visible ? "" : " hidden"}`}>
                    <FontAwesomeIcon icon={icons[direction]} />
                </div>
            </Link>
        </>
    );
}
