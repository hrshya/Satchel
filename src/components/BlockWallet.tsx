import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { generateWalletFromMnemonic, Wallet } from "../lib/utils";
import { generateMnemonic, validateMnemonic } from "bip39";
import { toast, Toaster } from "sonner";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";


interface MnemonicProps {
    mnemonic: string
    setMnemonic: Dispatch<SetStateAction<string>>
}


export const BlockWallet = ({mnemonic, setMnemonic}: MnemonicProps) => {
    const [ModalOpen, setModalOpen] = useState(false);
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const pathType = localStorage.getItem("pathtype") as string;
    const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<boolean[]>([]);
    const [mnemonicInput, setMnemonicInput] = useState("");
    var mnemonicArr = mnemonic.split(" ");
    const navigate = useNavigate();


    useEffect(() => {
        const storedWallets = localStorage.getItem("wallets");
        const storedMnemonic = localStorage.getItem("mnemonics");
        const storedPathTypes = localStorage.getItem("paths");

        if (storedWallets && storedMnemonic && storedPathTypes) {
        setWallets(JSON.parse(storedWallets));
        setVisiblePrivateKeys(JSON.parse(storedWallets).map(() => false));
        }
    }, []);

    const generateWallet =  () => {
        let mn = mnemonicInput.trim();
        if (mn) {
            if (!validateMnemonic(mn)) {
              toast.error("Invalid recovery phrase. Please try again.");
              return;
            }
        } else {
            mn = generateMnemonic();
        }

        setMnemonic(mn)

        const wallet = generateWalletFromMnemonic(
            pathType,
            mnemonic,
            wallets.length
        );

        if (wallet) {
            const updatedWallets = [...wallets, wallet];
            setWallets(updatedWallets);
            localStorage.setItem("wallets", JSON.stringify(updatedWallets));
            localStorage.setItem("mnemonics", JSON.stringify(mnemonic));
            localStorage.setItem("paths", JSON.stringify(pathType));
            setVisiblePrivateKeys([...visiblePrivateKeys, false]);
            toast.success("Wallet generated successfully!");
        }

    }

    const handleAddWallet = () => {
        if (!mnemonicArr) {
          toast.error("No mnemonic found. Please generate a wallet first.");
          return;
        }
    
        const wallet = generateWalletFromMnemonic(
          pathType,
          mnemonic,
          wallets.length
        );
        if (wallet) {
          const updatedWallets = [...wallets, wallet];
          const updatedPathType = [pathType, pathType];
          setWallets(updatedWallets);
          localStorage.setItem("wallets", JSON.stringify(updatedWallets));
          localStorage.setItem("pathTypes", JSON.stringify(updatedPathType));
          setVisiblePrivateKeys([...visiblePrivateKeys, false]);
          toast.success("Wallet generated successfully!");
        }
    }

    const handleClearWallets = () => {
        localStorage.removeItem("wallets");
        localStorage.removeItem("mnemonics");
        localStorage.removeItem("pathtype");
        localStorage.removeItem("paths");
        setWallets([]);
        setVisiblePrivateKeys([]);
        toast.success("All wallets cleared.");
        navigate("/");
    };

    const handleDeleteWallet = (index: number) => {
        const updatedWallets = wallets.filter((_, i) => i !== index);
    
        setWallets(updatedWallets);
        localStorage.setItem("wallets", JSON.stringify(updatedWallets));
        setVisiblePrivateKeys(visiblePrivateKeys.filter((_, i) => i !== index));
        toast.success("Wallet deleted successfully!");
      };

    const copyToClipboard = (content: string) => {
        navigator.clipboard.writeText(content);
        toast.success("Copied to clipboard!");
    };

    const togglePrivateKeyVisibility = (index: number) => {
        setVisiblePrivateKeys(
          visiblePrivateKeys.map((visible, i) => (i === index ? !visible : visible))
        );
    };

    return (
        <div>
            <div>
                {mnemonic ? 
                <div className="mt-4">
                    <div className="border rounded-lg p-8 hover:cursor-pointer dark:border-[#222222]" >
                        <div className="flex justify-between items-center" onClick={() => setModalOpen(!ModalOpen)}>
                            <h1 className="tracking-tighter text-4xl text-[#171717] font-semibold dark:text-[#FAFAFA]">Your Secret Phrase</h1>
                            <div className={`px-4 py-3 rounded-xl hover:bg-gray-100 hover:cursor-pointer dark:text-[#FAFAFA] dark:hover:bg-[#222222] ${ModalOpen ? "rotate-180" : ""}`} >
                                <ChevronDown className="size-4" />
                            </div>
                        </div>
                        <Toaster />
                        <div className={`${ModalOpen ? "block" : "hidden"}`} onClick={() => copyToClipboard(mnemonic)}>
                            <div className="grid grid-cols-4 gap-2 mt-12">
                                {mnemonicArr.map((items, index) => (
                                    <div key={index} className="py-4 px-4 bg-gray-100 rounded-lg text-lg hover:bg-gray-200 text-[#171717] dark:bg-[#151515] dark:text-[#FAFAFA] dark:hover:bg-[#222222]">
                                        {items}
                                    </div>
                                ))}
                            </div>
                            <div className="text-gray-500 flex gap-1 items-center mt-8 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                </svg>
                                <p>Click Anywhere To Copy</p>
                            </div>
                        </div>
                    </div>
                    <div className="my-8">
                        <div className="flex justify-between items-center">
                            <h1 className="tracking-tighter text-4xl text-[#171717] font-bold dark:text-[#FAFAFA]">{pathType === "501" ? "Solana" : "Ethereum"} Wallet</h1>
                            <div className="flex gap-2">
                                <Button name="Add Wallet" size="sm" onClick={() => handleAddWallet()} />
                                <Button name="Clear Wallets" color="destructive" size="sm" onClick={() => handleClearWallets()} />
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col gap-4">
                            {wallets.map((items, index) => (
                                <div key={index} className="border rounded-2xl border-gray-300 dark:border-[#222222]">
                                    <div className="px-8 py-6 flex justify-between items-center mb-2">
                                        <h1 className="tracking-tighter text-3xl text-[#171717] font-semibold dark:text-[#FAFAFA]">Wallet {index + 1}</h1>
                                        <button onClick={() => handleDeleteWallet(index)} className="rounded-md py-2 px-3 border border-transparent text-center text-sm text-red-500 dark:text-red-800 dark:hover:bg-[#222222] transition-all focus:bg-gray-100 focus:shadow-none active:bg-gray-100 hover:bg-gray-100 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="px-8 py-6 bg-gray-50 rounded-2xl dark:bg-[#181818]">
                                        <div className="hover:cursor-pointer" >
                                            <p className="tracking-tighter text-2xl text-[#171717] font-medium dark:text-[#FAFAFA]">Public Key</p>
                                            <div onClick={() => copyToClipboard(items.publicKey)} className="mt-1 text-lg text-[#171717] dark:text-[#FAFAFA]">{items.publicKey}</div>
                                        </div>
                                        <div className="hover:cursor-pointer mt-8">
                                            <p className="tracking-tighter text-2xl text-[#171717] font-medium dark:text-[#FAFAFA]">Private Key</p>
                                            <div className="flex justify-between items-center">
                                                <div onClick={() => copyToClipboard(items.privateKey)} className="mt-1 text-lg text-[#171717] dark:text-[#FAFAFA]">{!visiblePrivateKeys[index] ? '•'.repeat(items.privateKey.length) : items.privateKey}</div>
                                                <button onClick={() => togglePrivateKeyVisibility(index)} className="rounded-md py-2 px-3 border border-transparent text-center text-sm text-[#171717] dark:text-[#FAFAFA] dark:hover:bg-[#222222] transition-all focus:bg-gray-100 focus:shadow-none active:bg-gray-100 hover:bg-gray-100 dark:active:bg-[#222222] dark:focus:bg-[#222222] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                                    {!visiblePrivateKeys[index] ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        </svg> 
                                                    :
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                        </svg>
                                                    }
                                                    
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> : 
                <div>
                    <div className="w-full mt-4 flex gap-4">
                        <input type="password" value={mnemonicInput} onChange={(e) => setMnemonicInput(e.target.value)} className="w-[1048px] bg-transparent active:ring-2 focus:ring-2 ring-[#171717] ring-offset-2 placeholder:text-slate-500 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none hover:border-slate-300 shadow-sm focus:shadow dark:ring-[#FAFAFA] dark:ring-offset-[#171717]" placeholder="Enter your secret phrase (or leave blank to generate)" />
                        <Button name={`${mnemonicInput ? "Add" : "Generate"} Wallet`}  onClick={() => generateWallet()} />
                    </div>
                </div>
                }
            </div>
            
        </div>
    )
}
