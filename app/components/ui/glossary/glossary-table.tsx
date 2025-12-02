import * as React from "react";

export interface GlossaryItem {
    name: string;
    baseText: string;
    howItWorks?: string;
    treatment?: string;
    administration?: string;
    brands?: string;
    otherNames?: string;
    more?: string;
}

export interface GlossaryTable {
    section: string;
    headers: string[];
    items: GlossaryItem[];
}

function DescriptionSection(
    key: string,
    value: string,
    last?: boolean = false,
) {
    switch (key) {
        case "baseText":
            return (
                <div key={key}>
                    <p>{value}</p>
                    {!last ? <br /> : null}
                </div>
            );
        case "howItWorks":
            return (
                <div key={key}>
                    <p>
                        <b>How It Works:</b> {value}
                    </p>
                    {!last ? <br /> : null}
                </div>
            );
        case "treatment":
            return (
                <div key={key}>
                    <p>
                        <b>Treatment:</b> {value}
                    </p>
                    {!last ? <br /> : null}
                </div>
            );
        case "administration":
            return (
                <div key={key}>
                    <p>
                        <b>Administration:</b> {value}
                    </p>
                    {!last ? <br /> : null}
                </div>
            );
        case "brands":
            return (
                <div key={key}>
                    <p>
                        <b>Brands:</b> {value}
                    </p>
                    {!last ? <br /> : null}
                </div>
            );
        case "otherNames":
            return (
                <div key={key}>
                    <p>
                        <b>Other Names:</b> {value}
                    </p>
                    {!last ? <br /> : null}
                </div>
            );
        case "more":
            return (
                <div key={key}>
                    <p>
                        <b>For More Information:</b> {value}
                    </p>
                    {!last ? <br /> : null}
                </div>
            );
    }
}

function GlossaryRow(item: GlossaryItem, index: number) {
    const description = [];
    for (const [key, value] of Object.entries(item)) {
        if (key != "name") {
            if (key == Object.keys(item)[Object.keys(item).length - 1]) {
                description.push(DescriptionSection(key, value, true));
                break;
            }
            description.push(DescriptionSection(key, value));
        }
    }
    return (
        <tr key={index}>
            <td>{item.name}</td>
            <td>{description}</td>
        </tr>
    );
}

export function GlossarySection(table: GlossaryTable) {
    return (
        <>
            <h2>{table.section}</h2>
            <table>
                <tbody>
                    <tr>
                        {table.headers.map((header, index) => {
                            return <th key={index}>{header}</th>;
                        })}
                    </tr>
                    {table.items.map((item, index) => {
                        return GlossaryRow(item, index);
                    })}
                </tbody>
            </table>
        </>
    );
}
