import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
} from "@remix-run/node";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";

import Homepage from "./homepage";
import Cookies from "./cookies";

import { userPrefs } from "~/cookies.server";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";

export async function loader({
    request,
}: LoaderFunctionArgs) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};
    return { answeredQuestionaire: cookie.answeredQuestionaire };
}

export async function action({
    request,
}: ActionFunctionArgs) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};
    const bodyParams = await request.formData();

    if (bodyParams.get("answeredQuestionaire") === "hidden") {
        cookie.answeredQuestionaire = true;
    }

    return redirect("/", {
        headers: {
            "Set-Cookie": await userPrefs.serialize(cookie),
        },
    });
}

export default function Index() {
    const { answeredQuestionaire } = useLoaderData<typeof loader>();
    const [open, setOpen] = useState(true);

    return (
        <div>
            {answeredQuestionaire ? null : (
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
                        {Cookies()}
                    </DialogContent>
                </Dialog>
            )}
            < Homepage />
        </div>
    );
}
