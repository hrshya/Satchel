import { useNavigate } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { Button } from "../components/ui/Button"
import { toast, Toaster } from "sonner"


export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="px-12 py-6 dark:bg-black">
      <div className="h-[88.2vh]">
        <Navbar />
        <div className="dark:text-[#FAFAFA] mt-16">
          <div>
            <h1 className="tracking-tighter text-5xl text-[#171717] font-bold dark:text-[#FAFAFA]">Satchel supports multiple blockchains</h1>
            <h4 className="tracking-tighter text-2xl text-gray-600 font-medium dark:text-gray-200">Choose a blockchain to get started.</h4>
          </div>
          <Toaster />
          <div className="flex gap-2 mt-4">
            <Button name={"Solana"} onClick={() => {localStorage.setItem("pathtype", "501"); toast.success( "Wallet selected. Please generate a wallet to continue."); navigate("/wallet")}} />
            <Button name={"Ethereum"} onClick={() => {localStorage.setItem("pathtype", "60"); toast.success( "Wallet selected. Please generate a wallet to continue."); navigate("/wallet")}} />
          </div>
        </div>
      </div>
      <Footer />
    </div>

  )
}

