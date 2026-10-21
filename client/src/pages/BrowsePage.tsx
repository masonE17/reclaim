import { useEffect } from "react";
import Header from "../components/Header";

export default function BrowsePage() {
    // Scroll to the top when this page opens
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header isBrowse />
            <div className="w-full max-w-325 mx-auto border border-black p-1">
                {/* Add this page's code inside this div */}
                <p>Browse Page</p>
            </div>
        </>
    );
}
