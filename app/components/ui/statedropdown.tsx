import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@components/ui/popover";
import { Button } from "@components/ui/button";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";

const StateDropdown = () => {
    const states = [
        {
            value: "Alabama",
            label: "Alabama"
        },
        {
            value: "Alaska",
            label: "Alaska"
        },
        {
            value: "Arizona",
            label: "Arizona"
        },
        {
            value: "Arkansas",
            label: "Arkansas"
        },
        {
            value: "California",
            label: "California"
        },
        {
            value: "Colorado",
            label: "Colorado"
        },
        {
            value: "Connecticut",
            label: "Connecticut"
        },
        {
            value: "Delaware",
            label: "Delaware"
        },
        {
            value: "Florida",
            label: "Florida"
        },
        {
            value: "Georgia",
            label: "Georgia"
        },
        {
            value: "Hawaii",
            label: "Hawaii"
        },
        {
            value: "Idaho",
            label: "Idaho"
        },
        {
            value: "Illinois",
            label: "Illinois"
        },
        {
            value: "Indiana",
            label: "Indiana"
        },
        {
            value: "Iowa",
            label: "Iowa"
        },
        {
            value: "Kansas",
            label: "Kansas"
        },
        {
            value: "Kentucky",
            label: "Kentucky"
        },
        {
            value: "Louisiana",
            label: "Louisiana"
        },
        {
            value: "Maine",
            label: "Maine"
        },
        {
            value: "Maryland",
            label: "Maryland"
        },
        {
            value: "Massachusetts",
            label: "Massachusetts"
        },
        {
            value: "Michigan",
            label: "Michigan"
        },
        {
            value: "Minnesota",
            label: "Minnesota"
        },
        {
            value: "Mississippi",
            label: "Mississippi"
        },
        {
            value: "Missouri",
            label: "Missouri"
        },
        {
            value: "Montana",
            label: "Montana"
        },
        {
            value: "Nebraska",
            label: "Nebraska"
        },
        {
            value: "Nevada",
            label: "Nevada"
        },
        {
            value: "New Hampshire",
            label: "New Hampshire"
        },
        {
            value: "New Jersey",
            label: "New Jersey"
        },
        {
            value: "New Mexico",
            label: "New Mexico"
        },
        {
            value: "New York",
            label: "New York"
        },
        {
            value: "North Carolina",
            label: "North Carolina"
        },
        {
            value: "North Dakota",
            label: "North Dakota"
        },
        {
            value: "Ohio",
            label: "Ohio"
        },
        {
            value: "Oklahoma",
            label: "Oklahoma"
        },
        {
            value: "Oregon",
            label: "Oregon"
        },
        {
            value: "Pennsylvania",
            label: "Pennsylvania"
        },
        {
            value: "Rhode Island",
            label: "Rhode Island"
        },
        {
            value: "South Carolina",
            label: "South Carolina"
        },
        {
            value: "South Dakota",
            label: "South Dakota"
        },
        {
            value: "Tennessee",
            label: "Tennessee"
        },
        {
            value: "Texas",
            label: "Texas"
        },
        {
            value: "Utah",
            label: "Utah"
        },
        {
            value: "Vermont",
            label: "Vermont"
        },
        {
            value: "Virginia",
            label: "Virginia"
        },
        {
            value: "Washington",
            label: "Washington"
        },
        {
            value: "West Virginia",
            label: "West Virginia"
        },
        {
            value: "Wisconsin",
            label: "Wisconsin"
        },
        {
            value: "Wyoming",
            label: "Wyoming"
        },

    ];

    const [dropdownOpen, dropdownSetOpen] = useState(false);
    const [value, setValue] = useState("");

    // Update the hidden input field with the selected value
    React.useEffect(() => {
        const hiddenInput = document.getElementById('usState') as HTMLInputElement
        if (hiddenInput) {
            hiddenInput.value = value
        }
    }, [value])

    return (
        <Popover open={dropdownOpen} onOpenChange={dropdownSetOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    role="combobox"
                    aria-expanded={dropdownOpen}
                    className="w-[300px] justify-between"
                >
                    {value
                        ? states.find((state) => state.value === value)?.label
                        : "Select state..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-[300px] p-0 bg-white">
                <Command>
                    <CommandInput placeholder="Search state..." className="h-2 p-2" />
                    <CommandList>
                        <CommandEmpty>No state found.</CommandEmpty>
                        <CommandGroup>
                            {states.map((state) => (
                                <CommandItem
                                    key={state.value}
                                    value={state.value}
                                    className="command-item"
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        dropdownSetOpen(false)
                                    }}
                                >
                                    {state.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === state.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default StateDropdown;
