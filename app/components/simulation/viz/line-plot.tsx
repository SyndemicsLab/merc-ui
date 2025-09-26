import * as d3 from "d3";
import { useState } from "react";

interface PlotMargins {
    top: number;
    left: number;
    right: number;
    bottom: number;
}

interface LinePlotProps {
    data: any;
    title: string;
    xTitle: string;
    yTitle: string;
    width: number;
    height: number;
    margin: PlotMargins;
}

function Tip({ data, position, show }) {
    return(
            <g
                pointerEvents="none"
                className={show ? null : "hidden"}
                textAnchor="middle"
                transform={`translate(${position})`}
            >
                <rect x="-27" width="54" y="-30" height="20" fill="white"></rect>
                <text
                    y="-15"
                    style={{ fontSize: "0.8em", fontFamily: "sans-serif" }}>
                    {`(${data[0]}, ${data[1]})`}
                </text>
                <circle r="3.5" stroke="currentColor" strokeWidth="2" />
            </g>
    );
}

function Tooltip({ data, height, x, y }) {
    const [showIndex, setShowIndex] = useState(-1);

    let regions = [];
    let tips = [];
    for (let d = 0; d < data.length; ++d) {
        let width = 0;
        if (d === data.length - 1) {
            width = x(data[d][0]) - x(data[d-1][0]);
        } else {
            width = x(data[d+1][0]) - x(data[d][0]);
        }
        regions.push(
            <rect
                key={d}
                x={x(data[d][0]) - width / 2}
                height={height}
                width={width}
                onMouseOver={() => setShowIndex(d)}
                onMouseOut={() => setShowIndex(-1)}
            ></rect>
        );
        tips.push(
            <Tip
                key={d}
                data={data[d]}
                position={`${x(data[d][0])}, ${y(data[d][1])}`}
                show={showIndex === d}
            />
        );
    }
    return(
        <>
            <g fill="none" pointerEvents="all">
                {regions}
            </g>
            {tips}
        </>
    );
}

export default function LinePlot({
    data,
    title,
    xTitle,
    yTitle,
    width = 640,
    height = 480,
    margin = 20
}: LinePlotProps) {
    const x = d3.scaleLinear()
          .domain([d3.min(data, d => d[0]), d3.max(data, d => d[0])])
          .range([margin, width - (2 * margin)]);
    const yMin = d3.min(data, d => d[1]);
    const y = d3.scaleLinear()
          .domain([yMin > 0 ? 0 : yMin, d3.max(data, d => d[1])])
          .range([height - margin, margin]);
    const line = d3.line()
          .x(d => x(d[0]))
          .y(d => y(d[1]));
    const xLine = d3.line()
          .x(d => d > 0 ? width - margin : margin)
          .y(d => height - margin );
    const xAxis = x.ticks(width / 40).map(value => ({
        value, xOffset: x(value)
    }));
    const yLine = d3.line()
          .x(d => margin)
          .y(d => d > 0 ? height - margin : margin - 1);
    const yAxis = y.ticks(height / 20).map(value => ({
        value, yOffset: y(value)
    }));

    return(
        <svg width={width} height={height} style={{ maxWidth: "100%", height: "auto", margin: "auto", overflow: "visible" }}>
            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d={xLine([0, 1])}
            />
            {xAxis.map(({value, xOffset}) => (
                <g key={value} transform={`translate(${xOffset}, ${height - margin})`}>
                    <line y2={6} stroke="currentColor" strokeWidth="2" />
                    <text
                        key={value}
                        style={{
                            fontSize: "0.6em",
                            textAnchor: "middle",
                            transform: "translateY(20px)"
                        }}
                    >
                        {value}
                    </text>
                </g>
            ))}
            <g transform={`translate(${width}, ${height - margin})`}>
                <text
                    style={{
                        textAnchor: "middle",
                        alignmentBaseline: "central",
                        fontSize: "0.8em"
                    }}>{xTitle}</text>
            </g>
            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d={yLine([0, 1])}
            />
            {yAxis.map(({value, yOffset}) => (
                <g key={value} transform={`translate(${margin}, ${yOffset})`}>
                    <line x2={-6} stroke="currentColor" strokeWidth="2" />
                    <text
                        key={value}
                        style={{
                            fontSize: "0.6em",
                            textAnchor: "middle",
                            alignmentBaseline: "central",
                            transform: "translateX(-20px)"
                        }}
                    >
                        {value}
                    </text>
                </g>
            ))}
            <g transform={`translate(0, ${margin/2})`}>
                <text style={{ fontSize: "0.8em" }}>{yTitle}</text>
            </g>
            <path fill="none" stroke="#003771" strokeWidth="2" d={line(data)} />
            <g fill="#3D9BE9" stroke="#003771" strokeWidth="2">
                {data.map((d, i) => {
                    return(
                        <circle key={i} cx={x(d[0])} cy={y(d[1])} r="3.5" />
                    );
                })}
            </g>
            <g transform={`translate(${width / 2}, 0)`}>
                <text style={{ fontSize: "1.5rem", textAnchor: "middle" }}>{title}</text>
            </g>
            <Tooltip data={data} height={height} x={x} y={y} />
        </svg>
    );
}
