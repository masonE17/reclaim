import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
    // Scroll to the top when this page opens
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 w-full max-w-325 mx-auto border border-black p-1">
                {/* Add this page's code inside this div */}
                <p>Home Page</p>
            </div>
            <Footer />
        </div>
    );
}
