import { useState } from "react";

const NamedSlider = (
    { inputName, min, max, step, defaultValue, readOnly = false }:
    { inputName: string, min: number, max: number, step: number, defaultValue: any, readOnly?: boolean }
) => {
    const [value, setValue] = useState(defaultValue);
    return (
        <>
            <div className="inputName">{inputName}</div>
	    {readOnly ? (
		<div className="slider">
                    <input
			type="number"
			min={min}
			max={max}
			step={step}
			value={value}
			name={`${inputName}-num`}
			readOnly={readOnly}
                    />
                    <input
			type="range"
			min={min}
			max={max}
			step={step}
			value={value}
			id={`${inputName}-slider`}
			readOnly={readOnly}
                    />
		</div>
	    ) : (
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
	    )}
        </>
    );
}

export default NamedSlider;
