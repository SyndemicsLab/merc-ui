import About from "@components/home/about";
import ModelMaterials from "@components/home/modelmaterials";
import Publications from "@components/home/publications";

export default function RESPOND() {
    return(
	<div id="respond">
	    <About />
	    <ModelMaterials />
	    <Publications />
	</div>
    );
}
