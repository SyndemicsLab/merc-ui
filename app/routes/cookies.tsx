import {
    Form,
} from "@remix-run/react";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";

const Cookies = () => {
    const [open, setOpen] = useState(true);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Questions</DialogTitle>
                </DialogHeader>
                <Form method="post">
                    <input
                        type="hidden"
                        name="answeredQuestionaire"
                        value="hidden" />
                    <button type="submit">Hide</button>
                </Form>
                <div className="cookies">
                    <Form id="visit">
                        <span className="cookieQuestion">
                            Purpose of Site Visit (Select all that apply)
                        </span>
                        <ul>
                            <li>
                                <input type="checkbox" />
                                <span>Personal research</span>
                            </li>
                            <li>
                                <input type="checkbox" />
                                <span>Policy development</span>
                            </li>
                            <li>
                                <input type="checkbox" />
                                <span>Academic research</span>
                            </li>
                            <li>
                                <input type="checkbox" />
                                <span>Program development</span>
                            </li>
                            <li>
                                <input type="checkbox" />
                                <span>
                                    Other
                                    <input
                                        type="text"
                                        placeholder="Purpose"
                                    />
                                </span>
                            </li>
                        </ul>
                    </Form>
                    <Form id="location">
                        <span className="cookieQuestion">
                            Location
                        </span>
                    </Form>
                    <Form id="occupation">
                        <span className="cookieQuestion">
                            Occupation/Field of Work (Select all that apply)
                        </span>
                        <ul>
                            <li>
                                <input type="checkbox" />
                                <span>Healthcare</span>
                            </li>
                            <li>
                                <input type="checkbox" />
                                <span>Public health</span>
                            </li>
                            <li>
                                <input type="checkbox" />
                                <span>Research</span>
                            </li>
                            <li>
                                <input type="checkbox" />
                                <span>Policy</span>
                            </li>
                            <li>
                                <input type="checkbox" />
                                <span>Government</span>
                            </li>
                            <li>
                                <input type="checkbox" />
                                <span>Education</span>
                            </li>
                            <li>
                                <input type="checkbox" />
                                <span>Non-profit/community organization</span>
                            </li>
                            <li>
                                <input type="checkbox" />
                                <span>Media/communications</span>
                            </li>
                            <li>
                                <input type="checkbox" />
                                <span>
                                    Other
                                    <input
                                        type="text"
                                        placeholder="Occupation/Field of Work"
                                    />
                                </span>
                            </li>
                        </ul>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Cookies;
