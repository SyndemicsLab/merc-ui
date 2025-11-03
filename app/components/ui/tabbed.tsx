import { ReactNode } from "react";

function Tab({ name }: { name: string }) {
    return(
        <div className="tab">
            {name}
        </div>
    );
}

function TabBody({ children }: ReactNode) {
    return(
        <div classname="tab-body">
            {children}
        </div>
    );
}

function TabbedComponent({ contents }: { contents: Object[] }) {
    return(
        <div className="tab-root">

        </div>
    );
}
