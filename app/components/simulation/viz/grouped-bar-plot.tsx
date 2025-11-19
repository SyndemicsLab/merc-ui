import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { type PlotMargins } from "@components/simulation/viz/line-plot";

interface BarPlotProps {
    data: object[];
    primaryKey: string;
    groupKey: string;
    valueKey: string;
    legendLabel: string;
    title?: string;
    xTitle?: string;
    yTitle?: string;
    width?: number;
    height?: number;
    margin?: PlotMargins;
}

interface LegendOptions {
    containerWidth: number;
    width?: number;
    height?: number;
    colorWidth?: number,
    colorHeight?: number
    xMargin?: number,
    yMargin?: number
    alignRight?: boolean;
}

function createLegend(svg: object, colors: object, options: LegendOptions) {
    const {
        containerWidth, // must be passed to this object for right alignment
        width = 100,
        height = 50,
        colorWidth = 10,
        colorHeight = 10,
        xMargin = 5,
        yMargin = 8,
        alignRight = true,
    } = options;

    const xPosition = alignRight ?
          (containerWidth - width) : xMargin;
    const legendY = d3.scaleBand()
          .domain(colors.domain())
          .rangeRound([0, height])
          .paddingInner(0.2);

    const legend = svg.append("g")
          .attr("x", xPosition)
          .attr("y", yMargin)
          .attr("height", height)
          .attr("width", width);

    // color blocks
    legend.selectAll("rect")
        .data(colors.domain())
        .join("rect")
        .attr("x", xPosition)
        .attr("y", d => legendY(d) + 2 * yMargin)
        .attr("width", colorWidth)
        .attr("height", colorHeight)
        .attr("fill", colors);
    // names
    legend.selectAll("text")
        .data(colors.domain())
        .join("text")
        // gap of 5 after color block
        .attr("x", xPosition + colorWidth + xMargin)
        .attr("y", (d) => legendY(d) + 2 * yMargin)
        .attr("font-size", "0.5rem")
        .attr("alignment-baseline", "before-edge")
        .text(d => d);

    const boxPosition = xPosition - xMargin;

    legend.append("rect")
        .attr("x", boxPosition)
        .attr("y", yMargin)
        .attr("height", height + 2 * yMargin)
        .attr("width", width)
        .attr("stroke", "var(--primary-color)")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    legend.append("text")
        .attr("x", boxPosition + width / 2)
        .attr("y", yMargin + (height + 2 * yMargin))
        .attr("font-size", "0.75rem")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-weight", "600")
        .attr("fill", "var(--tertiary-color)")
        .text("Legend");
}

export default function GroupedBarPlot(props: BarPlotProps) {
    const {
        data,
        primaryKey,
        groupKey,
        valueKey,
        legendLabel,
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

        // define the function that determines where the bar is drawn
        const placement = d3.scaleBand()
              .domain(new Set(data.map(d => d[primaryKey])))
              .range([margin.left, width - margin.right])
              .paddingInner(0.04)
              .paddingOuter(0.1);

        const groups = new Set(data.map(d => d[groupKey]));
        const x = d3.scaleBand()
              .domain(groups)
              .range([0, placement.bandwidth()])
              .padding(0.03);
        // syndemics pink, syndemics blue, and syndemics cyan
        const color = d3.scaleOrdinal([`#f0325f`, `#003771`, `#3d9be9`])
              .domain(groups);

        // the additional (unitless) value added to the range is used to avoid
        // intersecting with the information above the graph (i.e. legend and
        // tooltip)
        const y = d3.scaleLinear()
              .domain([0, d3.max(data, d => d[valueKey])]).nice()
              .range([height - margin.bottom, margin.top + 40]);

        svg.append("g")
            .selectAll()
            .data(d3.group(data, d => d[primaryKey]))
            .join("g")
            .attr("transform", ([key]) => `translate(${placement(key)}, 0)`)
            .selectAll()
            .data(([, d]) => d)
            .join("rect")
                .attr("x", d => x(d[groupKey]))
                .attr("y", d => y(d[valueKey]))
                .attr("width", x.bandwidth())
                .attr("height", d => y(0) - y(d[valueKey]))
                .attr("fill", d => color(d[groupKey]));

        // X-axis
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(placement).tickSizeOuter(0))
            .call(g => g.selectAll(".domain").remove());
        if (xTitle) {
            svg.append("text")
                .attr("transform", `translate(${width / 2}, ${height})`)
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "after-edge")
                .attr("font-size", "0.8rem")
                .text(xTitle);
        }

        // Y-axis
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

        // legend
        createLegend(svg, color, { containerWidth: width });

        const tooltip = svg
            .append("text")
            .attr("x", margin.left)
            .attr("y", margin.top)
            .style("fill", "#777")
            .text("Hover over bar to see value");

        svg.append("g")
            .selectAll()
            .data(d3.group(data, d => d[primaryKey]))
            .join("g")
                .attr("transform", ([key]) => `translate(${placement(key)}, 0)`)
                .attr("pointer-events", "all")
                .attr("fill", "none")
            .selectAll()
            .data(([, d]) => d)
            .join("rect")
                .attr("x", d => x(d[groupKey]))
                .attr("y", d => margin.bottom)
                .attr("width", x.bandwidth())
                .attr("height", d => height - margin.top - margin.bottom)
            .on("mouseover", (event, d) => tooltip.text(`${d[primaryKey]}, ${d[groupKey]}: ${d[valueKey]}`))
            .on("mouseout", () => tooltip.text("Hover over bar to see value"));
    }, [data, xTitle, yTitle, width, height, margin, plotContainer]);

    return (
        <div className="bar-plot">
            {title ? (<h2>{title}</h2>) : null}
            <svg
                viewBox={`0 0 ${width} ${height}`}
                ref={plotContainer}
            />
        </div>
    );
}
