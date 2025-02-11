import {
    Interventions
} from "../ui/intervention"
import NamedSlider from "../ui/namedslider";
// import CollapsibleMenu from "../ui/collapsiblemenu";

export function GeneralInputs({ population, uptake }: { population: number, uptake: number }) {
    return (
        <div className="general-inputs">
            <NamedSlider inputName={"Initial Population Size (Full Model)"} min={0} max={300000} step={500} defaultValue={population} />
            <NamedSlider inputName={"Change in Population Per Week (Count)"} min={0} max={50000} step={100} defaultValue={uptake} />
            <Interventions />
        </div>
    );
}
