interface ButtonProps {
    name: string
    color?: string
    size?: string
    onClick?: any //() => Promise<void>
}

export const Button = ({ name, color, size, onClick }: ButtonProps) => {
  const bgColor = color==="destructive" ? "bg-[#EF4444] hover:bg-[#F05656] active:bg-[#F05656] focus:bg-[#F05656] dark:bg-red-800 dark:hover:bg-red-900" : "bg-[#171717] focus:bg-[#2E2E2E] active:bg-[#2E2E2E] hover:bg-[#2E2E2E] dark:bg-[#FAFAFA] dark:active:bg-[#E2E2E2] dark:hover:bg-[#E2E2E2] dark:text-[#171717]";
  const sizeButton = size==="sm" ? "text-sm py-2 px-4" : "py-2.5 px-8 text-md";
  return (
    <div>
        <button onClick={onClick} className={`rounded-md ${bgColor} ${sizeButton} border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`} type="button">
            {name}
        </button>
    </div>
  )
}

