import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

interface TooltipProps {
    inputName: string;
    body: string;
};

export default function Tooltip({ inputName, body }: TooltipProps) {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <div className="input-tooltip-trigger">
                    <FontAwesomeIcon icon={faInfo} />
                </div>
            </DialogTrigger>
            <DialogContent className="rounded-2xl bg-white max-w-1/2">
                <DialogTitle>{`About "${inputName}"`}</DialogTitle>
                <div className="input-tooltip-body">
                    {body}
                </div>
            </DialogContent>
        </Dialog>
    );
}
