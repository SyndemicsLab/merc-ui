export default function Input() {
    const intervention = {
        name: "No Treatment",
        helper: "Population not involved in any community based intervention treatments for opioid use disorder.",
        size: 7897,
        probs: { "buprenorphine": .035466, "naltrexone": 0.000735, "methadone": .009186, "detox": 0.000494, "detention": 0.001497, "retention": 0.952622 },
        od_probs: { "injection": 0.13, "non-injection": 0.09 }
    };

    return (
        <div id="interventions">

        </div>
    )
}