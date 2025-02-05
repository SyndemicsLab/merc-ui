import { useState } from "react";

const NamedSlider = (
    { inputName, min, max, step, defaultValue }:
    { inputName: string, min: number, max: number, step: number, defaultValue: any }
) => {
    const [value, setValue] = useState(defaultValue);

    return (
        <>
            <div className="inputName">{inputName}</div>
            <div className="slider">
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    name={`${inputName}-num`}
                    onChange={(event) => setValue(event.target.value)}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    id={`${inputName}-slider`}
                    onChange={(event) => setValue(event.target.value)}
                />
            </div>
        </>
    );
}

export default NamedSlider;
