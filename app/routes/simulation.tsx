import { System } from "../system";
import { GeneralInputs, AdvancedInputs, EmailForm, Disclaimers } from "../inputs";

export default function Index() {
  const population = 214000;
  const uptake = 5000;

  return (
    <div>
      <System />
      <hr />
      <div id="inputs">
        <h1>Inputs & Advanced Options</h1>
        <GeneralInputs population={population} uptake={uptake} />
        <AdvancedInputs />
        <EmailForm />
        <label id="run">
          <div className="run-text"><span>▶ RUN</span></div>
        </label>
      </div>
      <Disclaimers />
    </div>
  );
}
