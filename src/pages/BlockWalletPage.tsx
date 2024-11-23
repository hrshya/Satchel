import { useState } from "react";
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { BlockWallet } from "../components/BlockWallet";


export const SolanaPage = () => {
    const [mnemonic, setMnemonic] = useState("");
    return (
    <div className="px-12 py-6 dark:bg-black">
        <div className="min-h-[88.2vh]">
            <Navbar />
            {mnemonic ? 
            <div>

            </div> 
            : 
            <div>
                <div className="dark:text-[#FAFAFA] mt-16">
                    <div>
                        <h1 className="tracking-tighter text-6xl text-[#171717] font-bold dark:text-[#FAFAFA]">Secret Recovery Phrase</h1>
                        <h4 className="tracking-tighter text-2xl text-gray-700 font-medium dark:text-gray-200">Save these words in a safe place.</h4>
                    </div>
                </div>
            </div>
            }
            <div className="">
                <BlockWallet mnemonic={mnemonic} setMnemonic={setMnemonic} />
            </div>
            
        </div>
        <Footer />
    </div>
  )
}
