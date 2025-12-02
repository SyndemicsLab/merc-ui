import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

export enum ScrollDirection {
    Up = 0,
    Down = 1,
}

const icons: Dictionary<ScrollDirection> = {
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
