import { Link } from "react-router";

type HeaderProps = {
    isBrowse?: boolean;
    isSell?: boolean;
    isMessages?: boolean;
    isCart?: boolean;
};

export default function Header({ isBrowse, isSell, isMessages, isCart }: HeaderProps) {
    return (
        // Header
        <div className="sticky top-0 z-50 w-full bg-[#FFFFFF] flex justify-center items-center py-3 border-b border-[#DDE0D8]">
            <div className="w-full max-w-325 flex flex-row justify-between items-center p-1">
                <Link to="/" className="flex flex-row justify-center items-center gap-1">
                    <img src="/ReClaim-icon.png" alt="ReClaim Logo" className="w-12 h-12" />
                    <p className="text-[#1B1F1A] font-semibold text-[24px]">ReClaim</p>
                </Link>
                <div className="flex flex-row justify-center items-center gap-6">
                    <div className="group flex flex-col justify-center items-center">
                        {isBrowse ? (
                            <>
                                <p className="text-[#1B1F1A] font-semibold text-[18px]">Browse</p>
                                <div className="w-full border border-b border-[#2F6B47]"></div>
                            </>
                        ) : (
                            <>
                                <Link to="/browse">
                                    <p className="group-hover:text-[#1B1F1A] text-[#5A6058] font-semibold text-[18px]">Browse</p>
                                </Link>
                                <div className="border-transparent group-hover:border-[#2F6B47] w-full border border-b "></div>
                            </>
                        )}
                    </div>
                    <div className="group flex flex-col justify-center items-center">
                        {isSell ? (
                            <>
                                <p className="text-[#1B1F1A] font-semibold text-[18px]">Sell</p>
                                <div className="w-full border border-b border-[#2F6B47]"></div>
                            </>
                        ) : (
                            <>
                                <Link to="/sell">
                                    <p className="group-hover:text-[#1B1F1A] text-[#5A6058] font-semibold text-[18px]">Sell</p>
                                </Link>
                                <div className="border-transparent group-hover:border-[#2F6B47] w-full border border-b "></div>
                            </>
                        )}
                    </div>
                    <div className="group flex flex-col justify-center items-center">
                        {isMessages ? (
                            <>
                                <p className="text-[#1B1F1A] font-semibold text-[18px]">Messages</p>
                                <div className="w-full border border-b border-[#2F6B47]"></div>
                            </>
                        ) : (
                            <>
                                <Link to="/messages">
                                    <p className="group-hover:text-[#1B1F1A] text-[#5A6058] font-semibold text-[18px]">Messages</p>
                                </Link>
                                <div className="border-transparent group-hover:border-[#2F6B47] w-full border border-b "></div>
                            </>
                        )}
                    </div>
                    <div className="group flex flex-col justify-center items-center">
                        {isCart ? (
                            <>
                                <p className="text-[#1B1F1A] font-semibold text-[18px]">Cart</p>
                                <div className="w-full border border-b border-[#2F6B47]"></div>
                            </>
                        ) : (
                            <>
                                <Link to="/cart">
                                    <p className="group-hover:text-[#1B1F1A] text-[#5A6058] font-semibold text-[18px]">Cart</p>
                                </Link>
                                <div className="border-transparent group-hover:border-[#2F6B47] w-full border border-b "></div>
                            </>
                        )}
                    </div>
                </div>
                <Link to="/profile" className="flex flex-row justify-center items-center gap-2 pr-2">
                    <p className="text-[#5A6058] font-semibold text-[18px]">Profile</p>
                    <div className="w-10 h-10 rounded-full bg-[#E3E7DE] flex justify-center items-center">
                        <p className="text-[#5A6058] font-semibold text-[16px]">?</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
