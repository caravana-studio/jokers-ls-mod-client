import { useParams } from "react-router-dom";
import PreviewCard from "./PreviewCard";
import { PreviewPack } from "./PreviewPack";
import { PreviewSlot } from "./PreviewSlot";

export const PreviewPage = () => {
    const { type } = useParams();

    if (type === "card") {
        return <PreviewCard />;
    } else if (type === "pack") {
        return <PreviewPack />;
    } else if (type === "slot") {
        return <PreviewSlot />;
    }else {
        return <p>Page not found.</p>;
    }
}