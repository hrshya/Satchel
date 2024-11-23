import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <section className="max-w-7xl mx-auto border-t px-4 dark:border-[#FAFAFA]">
        <div className="flex justify-between py-8">
            <p className="text-[#171717] tracking-tight dark:text-[#FAFAFA]">
                Developed by{" "}
                <Link to={"https://portfo-woad.vercel.app/"} target='_blank' className="font-semibold">
                    Hrshya
                </Link>
            </p>
        </div>
  </section>
  )
}
