import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

export default function ScrollIndicator(
    { destination, visible = true }:
    { destination?: string, visible?: boolean }
) {
    return(
        <>
            <Link to={destination}>
                <div className={`scrolldown${visible ? "" : " hidden"}`}>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </div>
            </Link>
        </>
    );
}
