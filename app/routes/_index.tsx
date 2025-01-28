import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

import Homepage from "./homepage";
import Questionnaire from "../components/home/questionnaire";

import { userPrefs } from "~/cookies.server";
import { useLoaderData } from "react-router";

import { redirect } from "react-router";

export async function loader({
    request,
}: LoaderFunctionArgs) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};
    return { answeredQuestionnaire: cookie.answeredQuestionnaire };
}

export async function action({
    request,
}: ActionFunctionArgs) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};
    const formData = await request.formData();

    if (formData.get("answeredQuestionnaire") === "hidden") {
        cookie.answeredQuestionnaire = true;
    }

    console.log(formData.getAll("purpose"), formData.getAll("occupation"));

    return redirect("/", {
        headers: {
            "Set-Cookie": await userPrefs.serialize(cookie),
        },
    });
}

export default function Index() {
    const { answeredQuestionnaire } = useLoaderData<typeof loader>();

    return (
        <div>
            {answeredQuestionnaire ? null : (<Questionnaire />)}
            < Homepage />
        </div>
    );
}
