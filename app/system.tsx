import respond1 from "./images/diagram/1.png";
import respond2 from "./images/diagram/2.png";
import respond3 from "./images/diagram/3.png";
import respond4 from "./images/diagram/4.png";
import respond5 from "./images/diagram/5.png";
import respond6 from "./images/diagram/6.png";

export function System() {
    return(
	<>
            <img src={respond1} />
            <img src={respond2} /><br/>
            <img src={respond3} />
            <img src={respond4} /><br/>
            <img src={respond5} />
            <img src={respond6} />
	</>
    );
}
