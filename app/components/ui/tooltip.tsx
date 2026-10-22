import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

interface TooltipProps {
    inputName: string;
    body: string;
    hover?: boolean;
}

function HoverTooltip({ body }: { body: string }) {
    return (
        <>
            <div className="input-tooltip">
                <FontAwesomeIcon icon={faInfo} />
                <div className="input-tooltip-hover">{body}</div>
            </div>
        </>
    );
}

function DialogTooltip({
    inputName,
    body,
}: {
    inputName: string;
    body: string;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="input-tooltip">
                    <FontAwesomeIcon icon={faInfo} />
                </div>
            </DialogTrigger>
            <DialogContent className="rounded-2xl bg-white max-w-1/2">
                <DialogTitle>{`About "${inputName}"`}</DialogTitle>
                <div className="input-tooltip-body">{body}</div>
            </DialogContent>
        </Dialog>
    );
}

export default function Tooltip({ inputName, body, hover }: TooltipProps) {
    const tooltip = hover ? (
        <HoverTooltip body={body} />
    ) : (
        <DialogTooltip inputName={inputName} body={body} />
    );
    return tooltip;
}
