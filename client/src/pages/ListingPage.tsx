import { useEffect } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ListingPage() {
    const { id } = useParams();

    // Scroll to the top when this page opens
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 w-full max-w-325 mx-auto border border-black p-1">
                {/* Add this page's code inside this div */}
                <p>Listing Page</p>
            </div>
            <Footer />
        </div>
    );
}
