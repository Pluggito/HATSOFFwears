import { useState } from "react"
import CartTotal from "../Components/CartTotal"
import Title from "../Components/Title"

const PlaceOrder = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !phone || !address) {
            setError('Please fill in all fields');
            return;
        }
        // If validation passes, proceed to payment
        window.location.href = "https://sandbox.flutterwave.com/pay/3yqcw1lfjesg";
    }

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            {/*-----Left Side-------- */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex gap-3">
                    <input 
                        type="text" 
                        placeholder="First name" 
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
                        required 
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                    <input 
                        type="text" 
                        placeholder="Last name" 
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                </div>
                <input 
                    type="email" 
                    placeholder="Email address" 
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input 
                    type="text" 
                    placeholder="Address" 
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
                    required 
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                />
                <input 
                    type="tel" 
                    placeholder="Phone number" 
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full" 
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                />
            </form>

            {/*---------Right Side -------- */}
            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal />
                </div>

                <div className="w-full text-end mt-8">
                    <button 
                        onClick={handleSubmit} 
                        className="bg-black text-white px-16 py-3 text-sm"
                    >
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder