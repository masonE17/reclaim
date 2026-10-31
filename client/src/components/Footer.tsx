import { Link } from "react-router/internal/react-server-client";

export default function Footer() {
    return (
        <div className="bg-[#1B1E1C] flex justify-center pt-6 pb-3">
            <div className="w-full max-w-325 flex flex-col justify-center items-center p-1">
                <div className="flex flex-row justify-between items-start gap-4 w-[96%] mb-6">
                    <div className="w-full max-w-125 h-26 p-1 flex flex-col justify-start items-start gap-4">
                        <div className="flex flex-row justify-start items-center gap-2">
                            <img src="/ReClaim-icon.png" alt="ReClaim Logo" className="w-12 h-12" />
                            <p className="font-bold text-[28px] text-[#FFFFFF]">ReClaim</p>
                        </div>
                        <p className="text-[11px] text-[#C9CFCB] font-semibold">A local marketplace for resuable constuction <br />materials.</p>
                    </div>
                    <div className="w-full max-w-125 h-26 p-1 flex flex-row justify-end items-start gap-12">
                        <div className="flex flex-col justify-center items-start gap-2">
                            <p className="text-[15px] text-[#FFFFFF] font-bold">Marketplace</p>
                            <Link to="/browse" className="text-[11px] text-[#C9CFCB] font-semibold hover:text-[#8A918D]">Browse</Link>
                            <Link to="/sell" className="text-[11px] text-[#C9CFCB] font-semibold hover:text-[#8A918D]">Sell materials</Link>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-2">
                            <p className="text-[15px] text-[#FFFFFF] font-bold">Company</p>
                            <p className="text-[11px] text-[#C9CFCB] font-semibold hover:text-[#8A918D]">About</p>
                            <p className="text-[11px] text-[#C9CFCB] font-semibold hover:text-[#8A918D]">Contact</p>
                        </div>
                    </div>
                </div>
                <div className="w-full border-b-2 border-[#343A37] rounded-[5px] mb-3"></div>
                <div className="w-[96%] flex flex-row justify-between items-center p-1">
                    <p className="text-[11px] text-[#C9CFCB] font-semibold">@ 2026 ReClaim</p>
                    <p className="text-[11px] text-[#C9CFCB] font-semibold">Made by the ReClaim team</p>
                </div>
            </div>
        </div>
    );
}