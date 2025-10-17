import * as d3 from "d3";
import { useState, useRef, useEffect } from "react";
import { SYNDEMICS_PINK, SYNDEMICS_CYAN, SYNDEMICS_BLUE } from "~/globals";

export interface PlotMargins {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

interface LinePlotProps {
    data: number[][]; // data is an array of arrays
    title: string;
    xTitle?: string;
    yTitle?: string;
    width?: number;
    height?: number;
    margin?: PlotMargins;
}

function Tip({ data, position, valuePosition, show }) {
    return(
        <>
            <g
                pointerEvents="none"
                className={show ? null : "hidden"}
                transform={`translate(${position})`}
            >
                <circle r="1.5" stroke={`${SYNDEMICS_PINK}`} fill={`${SYNDEMICS_PINK}`}/>
            </g>
            <g
                pointerEvents="none"
                className={show ? null : "hidden"}
                transform={`translate(${valuePosition})`}
            >
                {/* shifting the text up by 5 to avoid intersecting with
                    the plots proper */}
                <text
                    y="-5"
                    style={{
                        fontSize: "0.6em",
                        fontFamily: "sans-serif",
                        alignmentBaseline: "after-edge"
                    }}
                >
                    {`(${data[0]}, ${data[1]})`}
                </text>
            </g>
        </>
    );
}

function Tooltip({ data, height, x, y, margin }) {
    const [showIndex, setShowIndex] = useState(-1);

    let regions = [];
    let tips = [];
    for (let d = 0; d < data.length; ++d) {
        let center = x(data[d][0]);
        let leftBound, rightBound;
        if (d === data.length - 1) {
            leftBound = (center - x(data[d-1][0])) / 2;
            rightBound = leftBound;
        } else if (d === 0) {
            rightBound = (x(data[d+1][0]) - center) / 2;
            leftBound = rightBound;
        } else {
            leftBound = (center - x(data[d-1][0])) / 2;
            rightBound = (x(data[d+1][0]) - center) / 2;
        }
        regions.push(
            <rect
                key={d}
                x={center - leftBound}
                height={height}
                width={rightBound + leftBound}
                onMouseOver={() => setShowIndex(d)}
                onMouseOut={() => setShowIndex(-1)}
            />
        );
        tips.push(
            <Tip
                key={d}
                data={data[d]}
                position={`${x(data[d][0])}, ${y(data[d][1])}`}
                valuePosition={`${margin.left}, ${margin.top}`}
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

/*
  Draws a line plot from data of the shape [2, N], e.g. [[0,0], [1,1], [2,2]],
  where N is the number of points in the data set.

  The default argument values are chosen arbitrarily based on trial and error
*/
export default function LinePlot({
    data,
    title,
    xTitle,
    yTitle,
    xTickSpacing = 40,
    yTickSpacing = 25,
    width = 650,
    height = 500,
    margin = {
        top: 20,
        right: 30,
        bottom: 40,
        left: 50
    }
}: LinePlotProps) {
    const x = d3.scaleLinear()
          .domain([d3.min(data, d => d[0]), d3.max(data, d => d[0])])
          .range([margin.left, width - margin.right])
          .nice();
    const yMin = d3.min(data, d => d[1]);
    const y = d3.scaleLinear()
          .domain([yMin >= 0 ? 0 : yMin, d3.max(data, d => d[1])])
          .range([height - margin.bottom, margin.top])
          .nice();
    const line = d3.line()
          .x(d => x(d[0]))
          .y(d => y(d[1]));
    const xLine = d3.line()
          .x(d => d > 0 ? width - margin.right + 1 : margin.left)
          .y(d => height - margin.bottom );
    const xAxis = x.ticks(width / xTickSpacing).map(value => ({
        value, xOffset: x(value)
    }));
    const yLine = d3.line()
          .x(d => margin.left)
          .y(d => d > 0 ? height - margin.bottom : margin.top - 1);
    const yAxis = y.ticks(height / yTickSpacing).map(value => ({
        value, yOffset: y(value)
    }));

    return(
        <div className="line-plot">
            {title ? (<h2>{title}</h2>) : null}
            <svg
                viewBox={`0 0 ${width} ${height}`}
            >
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d={xLine([0, 1])}
                />
                {xAxis.map(({value, xOffset}) => (
                    <g key={value} transform={`translate(${xOffset}, ${height - margin.bottom})`}>
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
                <g transform={`translate(${width/2}, ${height})`}>
                    <text
                        style={{
                            textAnchor: "middle",
                            alignmentBaseline: "after-edge",
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
                    <g key={value} transform={`translate(${margin.left}, ${yOffset})`}>
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
                <g transform={`translate(0, ${height/2}) rotate(-90)`}>
                    <text style={{ fontSize: "0.8em", alignmentBaseline: "before-edge", textAnchor: "middle" }}>{yTitle}</text>
                </g>
                <path fill="none" stroke={`${SYNDEMICS_CYAN}`} strokeWidth="2" d={line(data)} />
                <g fill={`${SYNDEMICS_BLUE}`}>
                    {data.map((d, i) => {
                        return(
                            <circle key={i} cx={x(d[0])} cy={y(d[1])} r="1.5" />
                        );
                    })}
                </g>
                <Tooltip data={data} height={height} x={x} y={y} margin={margin} />
            </svg>
        </div>
    );
}

export function AltLinePlot(props: LinePlotProps) {
    let {
        data,
        title,
        xTitle,
        yTitle,
        width = 650,
        height = 500,
        margin = {
            top: 20,
            right: 30,
            bottom: 40,
            left: 50
        }
    } = props;

    // reference for the SVG container
    const plotContainer = useRef(null);

    useEffect(() => {
        const svg = d3.select(plotContainer.current);

        // clear content when refreshing
        svg.selectAll("*").remove();

        const x = d3.scaleLinear()
              .domain([d3.min(data, d => d[0]), d3.max(data, d => d[0])])
              .range([margin.left, width - margin.right])
              .nice();
        const yMin = d3.min(data, d => d[1]);
        const y = d3.scaleLinear()
              .domain([yMin >= 0 ? 0 : yMin, d3.max(data, d => d[1])])
              .range([height - margin.bottom, margin.top + 15])
              .nice();
        const line = d3.line()
              .x(d => x(d[0]))
              .y(d => y(d[1]));

        // add the x-axis
        // the constant 80 was chosen arbitrarily
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
        xTitle ? svg.append("text")
            .attr("transform", `translate(${width / 2}, ${height})`)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "after-edge")
            .attr("font-size", "0.8rem")
            .text(xTitle) : null;

        // add the y-axis
        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(20, "s"))
            .call(g => g.selectAll(".domain").remove());
        // transforming the axis label so that it is 12 units closer to the axis
        // and rotating (-90 degrees) so that the bottom of the text faces the
        // axis
        yTitle ? svg.append("text")
            .attr("transform", `translate(12, ${height / 2}) rotate(-90)`)
            .attr("text-anchor", "middle")
            .attr("font-size", "0.8rem")
            .text(yTitle) : null;

        var tooltip = svg
            .append("text")
            .attr("x", margin.left)
            .attr("y", margin.top)
            .style("fill", "#777")
            .text("Hover over graph to see value at point");

        // line
        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", `${SYNDEMICS_CYAN}`)
            .attr("stroke-width", 2)
            .attr("d", line(data));

        // discrete data points
        const points = svg.append("g")
              .attr("fill", `${SYNDEMICS_BLUE}`)
              .selectAll()
              .data(data)
                  .join("circle")
                  .attr("cx", d => x(d[0]))
                  .attr("cy", d => y(d[1]))
                  .attr("r", 1.5);

        svg.append("g")
            .attr("pointer-events", "all")
            .attr("fill", "none")
            .selectAll()
            .data(d3.pairs(data))
            .join("rect")
            .attr("x", (d) => x(d[0][0]))
            .attr("y", margin.bottom)
            .attr("width", (d) => x(d[1][0]) - x(d[0][0]))
            .attr("height", d => height - margin.top - margin.bottom)
            .on("mouseover", (event, d) => tooltip.text(`(${d[0]}, ${d[1]})`))
            .on("mouseout", () => tooltip.text("Hover over graph to see value at point"));
    }, [data, xTitle, yTitle, width, height, margin, plotContainer]);

    return (
        <div className="line-plot">
            {title ? (<h2>{title}</h2>) : null}
            <svg
                viewBox={`0 0 ${width} ${height}`}
                ref={plotContainer}
            />
        </div>
    );
}
