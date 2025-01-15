import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
} from "@remix-run/node";

import Homepage from "./homepage";
import Questionaire from "./questionaire";

import { userPrefs } from "~/cookies.server";
import { useLoaderData } from "@remix-run/react";

import { redirect } from "@remix-run/node";

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

    return (
        <div>
            {answeredQuestionaire ? null : (<Questionaire />)}
            < Homepage />
        </div>
    );
}
