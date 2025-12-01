import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function TimedLoader({
    delay,
    children,
}: {
    delay: number;
    children: React.ReactNode;
}) {
    const [loaded, setLoaded] = React.useState(false);
    setTimeout(() => setLoaded(true), delay);
    return (
        <>
            {loaded ? (
                <>{children}</>
            ) : (
                <div className="timed-loader">
                    <FontAwesomeIcon
                        className="load-indicator"
                        icon={faSpinner}
                    />
                </div>
            )}
        </>
    );
}
