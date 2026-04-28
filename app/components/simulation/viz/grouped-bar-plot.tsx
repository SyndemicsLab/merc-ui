import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { type PlotMargins } from "@components/simulation/viz/line-plot";

type BarDatum = Record<string, string | number>;

interface BarPlotProps {
    data: BarDatum[];
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
    legendLabel?: string;
    width?: number;
    height?: number;
    colorWidth?: number;
    colorHeight?: number;
    xMargin?: number;
    yMargin?: number;
    alignRight?: boolean;
}

function createLegend(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    colors: d3.ScaleOrdinal<string, string>,
    options: LegendOptions,
) {
    const {
        containerWidth, // must be passed to this object for right alignment
        legendLabel = "Legend",
        width = 100,
        height = 50,
        colorWidth = 10,
        colorHeight = 10,
        xMargin = 5,
        yMargin = 8,
        alignRight = true,
    } = options;

    const xPosition = alignRight ? containerWidth - width : xMargin;
    const colorDomain = colors.domain();
    const legendY = d3
        .scaleBand()
        .domain(colorDomain)
        .rangeRound([0, height])
        .paddingInner(0.2);

    const legend = svg
        .append("g")
        .attr("x", xPosition)
        .attr("y", yMargin)
        .attr("height", height)
        .attr("width", width);

    // color blocks
    legend
        .selectAll("rect")
        .data(colorDomain)
        .join("rect")
        .attr("x", xPosition)
        .attr("y", (d) => (legendY(d) ?? 0) + 2 * yMargin)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("width", colorWidth)
        .attr("height", colorHeight)
        .attr("fill", (d) => colors(d));
    // names
    legend
        .selectAll("text")
        .data(colorDomain)
        .join("text")
        // gap of 5 after color block
        .attr("x", xPosition + colorWidth + xMargin)
        .attr("y", (d) => (legendY(d) ?? 0) + 2 * yMargin)
        .attr("font-size", "0.5rem")
        .attr("alignment-baseline", "before-edge")
        .text((d) => d);

    // Legend Border
    const boxPosition = xPosition - xMargin;

    legend
        .append("rect")
        .attr("x", boxPosition)
        .attr("y", yMargin)
        // rounded corners of bounding rectangle
        .attr("rx", xMargin)
        .attr("ry", xMargin)
        .attr("height", height + 2 * yMargin)
        .attr("width", width)
        .attr("stroke", "var(--primary-color)")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    // Legend Label
    const filter = svg
        .append("filter")
        .attr("id", "legend-filter")
        // x of -0.1 and width of 1.2 are complementary - they center the
        // legend label
        .attr("x", -0.1)
        .attr("y", 0)
        .attr("width", 1.2)
        .attr("height", 1);
    filter.append("feFlood").attr("flood-color", "white");
    filter.append("feComposite").attr("in", "SourceGraphic");
    legend
        .append("text")
        .attr("x", boxPosition + width / 2)
        .attr("y", yMargin + (height + 2 * yMargin))
        .attr("font-size", "0.5rem")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-weight", "600")
        .attr("fill", "var(--tertiary-color)")
        .attr("filter", "url(#legend-filter)")
        .text(legendLabel);
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
            left: 50,
        },
    } = props;

    // reference for the SVG container
    const plotContainer = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!plotContainer.current) {
            return;
        }

        const svg = d3.select(plotContainer.current);

        // clear content when refreshing
        svg.selectAll("*").remove();

        if (data.length === 0) {
            return;
        }

        const primaryDomain = Array.from(
            new Set(data.map((d) => String(d[primaryKey]))),
        );

        // define the function that determines where the bar is drawn
        const placement = d3
            .scaleBand()
            .domain(primaryDomain)
            .range([margin.left, width - margin.right])
            .paddingInner(0.04)
            .paddingOuter(0.1);

        const groups = Array.from(
            new Set(data.map((d) => String(d[groupKey]))),
        );
        const x = d3
            .scaleBand()
            .domain(groups)
            .range([0, placement.bandwidth()])
            .padding(0.03);
        // syndemics pink, syndemics blue, and syndemics cyan
        const color = d3
            .scaleOrdinal([`#f0325f`, `#003771`, `#3d9be9`])
            .domain(groups);

        // the additional (unitless) value added to the range is used to avoid
        // intersecting with the information above the graph (i.e. legend and
        // tooltip)
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => Number(d[valueKey])) ?? 0])
            .nice()
            .range([height - margin.bottom, margin.top + 40]);

        svg.append("g")
            .selectAll<SVGGElement, [string, BarDatum[]]>("g")
            .data(
                Array.from(
                    d3.group(data, (d) => String(d[primaryKey])).entries(),
                ),
            )
            .join("g")
            .attr("transform", ([key]) => `translate(${placement(key)}, 0)`)
            .selectAll<SVGRectElement, BarDatum>("rect")
            .data(([, d]) => d)
            .join("rect")
            .attr("x", (d) => x(String(d[groupKey])) ?? 0)
            .attr("y", (d) => y(Number(d[valueKey])))
            .attr("width", x.bandwidth())
            .attr("height", (d) => y(0) - y(Number(d[valueKey])))
            .attr("fill", (d) => color(String(d[groupKey])));

        // X-axis
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(placement).tickSizeOuter(0))
            .call((g) => g.selectAll(".domain").remove());
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
            .call((g) => g.selectAll(".domain").remove());
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
        createLegend(svg, color, {
            containerWidth: width,
            legendLabel: legendLabel,
        });

        const tooltip = svg
            .append("text")
            .attr("x", margin.left)
            .attr("y", margin.top)
            .style("fill", "#777")
            .text("Hover over bar to see value");

        svg.append("g")
            .selectAll<SVGGElement, [string, BarDatum[]]>("g")
            .data(
                Array.from(
                    d3.group(data, (d) => String(d[primaryKey])).entries(),
                ),
            )
            .join("g")
            .attr("transform", ([key]) => `translate(${placement(key)}, 0)`)
            .attr("pointer-events", "all")
            .attr("fill", "none")
            .selectAll<SVGRectElement, BarDatum>("rect")
            .data(([, d]) => d)
            .join("rect")
            .attr("x", (d) => x(String(d[groupKey])) ?? 0)
            .attr("y", margin.bottom)
            .attr("width", x.bandwidth())
            .attr("height", height - margin.top - margin.bottom)
            .on("mouseover", (_event, d) =>
                tooltip.text(
                    `${String(d[primaryKey])}, ${String(d[groupKey])}: ${String(
                        d[valueKey],
                    )}`,
                ),
            )
            .on("mouseout", () => tooltip.text("Hover over bar to see value"));
    }, [data, xTitle, yTitle, width, height, margin, plotContainer]);

    return (
        <div className="bar-plot">
            {title ? <h2>{title}</h2> : null}
            <svg viewBox={`0 0 ${width} ${height}`} ref={plotContainer} />
        </div>
    );
}
