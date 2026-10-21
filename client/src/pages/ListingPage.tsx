import { useEffect } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";

export default function ListingPage() {
    const { id } = useParams();

    // Scroll to the top when this page opens
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <>
            <Header />
            <div className="w-full max-w-325 mx-auto border border-black p-1">
                {/* Add this page's code inside this div */}
                <p>Listing Page</p>
            </div>
        </>
    );
}
