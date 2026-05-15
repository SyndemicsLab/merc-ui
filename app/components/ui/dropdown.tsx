import { useState, useEffect } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@components/ui/popover";
import { Button } from "@components/ui/button";
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";

interface DropdownOption {
    value: string;
    label: string;
}

function Dropdown({
    name,
    options,
}: {
    name: string;
    options: DropdownOption[];
}) {
    const [dropdownOpen, dropdownSetOpen] = useState(false);
    const [selected, setSelected] = useState("");

    // Update the hidden input field with the selected value
    useEffect(() => {
        const hiddenInput = document.getElementById(name) as HTMLInputElement;
        if (hiddenInput) {
            hiddenInput.value = selected;
        }
    }, [name, selected]);

    return (
        <Popover open={dropdownOpen} onOpenChange={dropdownSetOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    role="combobox"
                    aria-expanded={dropdownOpen}
                    className="w-[300px] justify-between"
                >
                    {selected
                        ? options.find((option) => option.value === selected)
                              ?.label
                        : "Select option..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-[300px] p-0 bg-white">
                <Command>
                    <CommandInput
                        placeholder="Search..."
                        className="h-2 px-2"
                    />
                    <CommandList>
                        <CommandEmpty>Not found.</CommandEmpty>
                        <CommandGroup heading="US States">
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    className="command-item"
                                    onSelect={(currentValue) => {
                                        setSelected(
                                            currentValue === selected
                                                ? ""
                                                : currentValue,
                                        );
                                        dropdownSetOpen(false);
                                    }}
                                >
                                    <span>{option.label}</span>
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selected === option.value
                                                ? "opacity-100"
                                                : "opacity-0",
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
}

export default Dropdown;
