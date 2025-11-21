import * as React from "react";
import * as d3 from "d3";
import { useRef, useEffect } from "react";
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

/*
  Draws a line plot from data of the shape [2, N], e.g. [[0,0], [1,1], [2,2]],
  where N is the number of points in the data set.

  The default argument values are chosen arbitrarily based on trial and error
*/
export default function LinePlot(props: LinePlotProps) {
    const {
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
            .call(
                d3.axisBottom(x)
                    .ticks(data.length < 10 ? data.length : width / 80,
                           data.length < 10 ? "g" : "d")
                    .tickSizeOuter(0)
            );
        if (xTitle) {
            svg.append("text")
                .attr("transform", `translate(${width / 2}, ${height})`)
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "after-edge")
                .attr("font-size", "0.8rem")
                .text(xTitle);
        }

        // add the y-axis
        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(20, "s"))
            .call(g => g.selectAll(".domain").remove());
        // transforming the axis label so that it is 12 units closer to the axis
        // and rotating (-90 degrees) so that the bottom of the text faces the
        // axis
        if (yTitle) {
            svg.append("text")
                .attr("transform", `translate(12, ${height / 2}) rotate(-90)`)
                .attr("text-anchor", "middle")
                .attr("font-size", "0.8rem")
                .text(yTitle);
        }

        const tooltip = svg
            .append("text")
            .attr("x", margin.left)
            .attr("y", margin.top)
            .style("fill", "#777")
            .text("Use your cursor to see detailed values");

        // line
        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", `${SYNDEMICS_CYAN}`)
            .attr("stroke-width", 2)
            .attr("d", line(data));

        // discrete data points
        const points = svg.append("g")
              .attr("fill", `${SYNDEMICS_BLUE}`);
        points.selectAll()
            .data(data)
            .join("circle")
                .attr("cx", d => x(d[0]))
                .attr("cy", d => y(d[1]))
                .attr("r", 1.5);

        const currentPoint = svg.append("circle")
              .attr("fill", `${SYNDEMICS_PINK}`)
              .attr("r", 2.5)
              .attr("visibility", "hidden");

        const regions = [];
        for (let i = 0; i < data.length; i++) {
            const center = x(data[i][0]);
            let width;
            if (i === 0) {
                width = x(data[i+1][0]) - x(data[i][0]);
            }
            else if (i === data.length - 1) {
                width = x(data[i][0]) - x(data[i-1][0]);
            }
            else {
                width = (x(data[i+1][0]) - x(data[i-1][0]))/2;
            }
            regions.push({
                "position": center - width / 2,
                "width": width,
                "point": data[i]
            });
        }

        svg.append("g")
            .attr("pointer-events", "all")
            .attr("fill", "none")
            .selectAll()
            .data(regions)
            .join("rect")
            .attr("x", d => d["position"])
            .attr("y", margin.bottom)
            .attr("width", d => d["width"])
            .attr("height", height - margin.top - margin.bottom)
            .on("mouseover", (event, d) => {
                tooltip.text(`(${d["point"][0]}, ${d["point"][1]})`);
                currentPoint
                    .attr("cx", x(d["point"][0]))
                    .attr("cy", y(d["point"][1]))
                    .attr("visibility", "visible");
            })
            .on("mouseout", () => {
                tooltip.text("Use your cursor to see detailed values");
                currentPoint.attr("visibility", "hidden");
            });
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
