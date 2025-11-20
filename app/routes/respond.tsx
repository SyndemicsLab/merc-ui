import * as React from "react";
import About from "@components/about/about";
import ModelMaterials from "@components/about/modelmaterials";
import Publications from "@components/about/publications";

export default function RESPOND() {
    return(
        <div id="respond">
            <About />
            <ModelMaterials />
            <Publications />
        </div>
    );
}
