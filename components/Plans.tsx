import Head from "next/head"
import Link from "next/link"
import useAuth from "../hooks/useAuth"
import { CheckIcon } from '@heroicons/react/outline'
import { Product } from "@stripe/firestore-stripe-payments"
import Table from "./Table"
import { useState } from "react"
import { loadCheckout } from '../lib/stripe'
import Loader from "./Loader"


interface Props {
    products: Product[]
}


function Plans({ products }: Props) {
    const { logout, user } = useAuth()
    const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2])
    const [isBillingLoading, setBillingLoading] = useState(false)

    const subscribeToPlan = () => {
        if (!user) return

        loadCheckout(selectedPlan?.prices[0].id!)
        setBillingLoading(true)
    }

    return (
        <div>
            <Head>
                <title>Netflix</title>
                <link rel="icon" href="/netflix.ico" />
            </Head>
            <header className="border-b border-white/10 bg-[#141414]">
                <Link href="/">
                    <img
                        src="https://rb.gy/ulxxee"
                        alt="Netflix"
                        width={150}
                        height={90}
                        className="cursor-pointer object-contain"
                    />
                </Link>
                <button
                    className="text-lg font-medium hover:underline"
                    onClick={logout}
                >
                    Sign Out
                </button>
            </header>

            <main className="pt-28 max-w-5xl mx-auto px-5 pb-12 transition-all md:px-10">
                <h1 className="mb-3 text-3xl font-medium">
                    Choose the plan that's right for you
                </h1>
                <ul>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
                        Ad-free.
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
                        just for you.
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
                        your plan anytime.
                    </li>
                </ul>

                <div className="mt-4 flex flex-col space-y-4">
                    <div className="flex w-full items-center justify-center self-end md:w-3/5">
                        {products.map((product) => (
                            <div key={product.id} onClick={() => setSelectedPlan(product)}
                                className={`planBox ${selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-60'}`}>
                                {product.name}
                            </div>
                        ))}
                    </div>

                    <Table products={products} selectedPlan={selectedPlan} />
                    <div className="flex items-center justify-center flex-col gap-y-4">
                        <button
                            disabled={!selectedPlan || isBillingLoading}
                            className={`w-11/12 rounded bg-[#e50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${isBillingLoading && 'opacity-60'
                                }`}
                            onClick={subscribeToPlan}
                        >
                            {isBillingLoading ? (
                                <Loader color="dark:fill-gray-300" />
                            ) : (
                                'Subscribe'
                            )}
                        </button>

                        <div className="rounded bg-[#e50914] p-4 text-md md:w-[420px] w-11/12">
                            When checking out, use card number<br></br> 4242 4242 4242 4242 with an expiry date and security code of your choice. Name on card and address can be anything as well.
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Plans
