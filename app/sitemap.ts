export interface Path {
    name: string;
    displayName: string;
}

export const sitemap: Path[] = [
    {
        name: "",
        displayName: "Home",
    },
    {
        name: "simulation",
        displayName: "Simulation",
    },
    {
        name: "respond",
        displayName: "About RESPOND",
    },
    {
        name: "glossary",
        displayName: "Glossary",
    },
    // removing temporarily for alpha
    // {
    //     name: "contact",
    //     displayName: "Contact",
    // },
];
