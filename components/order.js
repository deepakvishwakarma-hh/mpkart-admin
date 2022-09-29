import Link from "next/link";
import React from "react";
import statuscolor from "../lib/statuscolor"
import { firestore } from "../firebase.config"
import ObjectPreviewer from "./object-previewer"
import { updateDoc, doc, deleteDoc } from "firebase/firestore";

const Order = ({ children }) => {

    const [isEnabled, setEnabled] = React.useState(false)

    function onClickHandler(event) {
        if (event.detail === 2) {
            setEnabled(!isEnabled)
        }
    }

    function markRefundedHandler() {
        const revalidation = confirm('Do you really want to mark as refunded?')
        if (!revalidation) return
        updateDoc(doc(firestore, 'orders', `${id}`), { status: 'refunded' }).catch((err) => alert(err))
    }

    function deletePermanentHandler() {
        const revalidation = prompt('confirmation password')
        if (revalidation !== 'guddu') return
        deleteDoc(doc(firestore, 'orders', `${id}`)).catch((err) => alert(err))
    }

    const { status, id, address } = children
    const date = new Date(+id);

    const orderColor = statuscolor(status)


    return (
        <section id={id} >
            <div style={{ background: isEnabled ? 'whitesmoke' : '' }} onClickCapture={onClickHandler} className="px-2 grid grid-cols-5 gap-2 py-3 border-b-2 border-gray-100" >
                <h3 className={`font-medium p-1 capitalize tracking-wide`} style={{ color: orderColor }} >{status}</h3>
                <h3>{date.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</h3>
                <h3>{id}</h3>
                <h3>{address.place} / {address.state} </h3>
                <Link href={`/order/${id}`}><h3 className="text-blue-500 cursor-pointer">see more</h3></Link>
            </div>
            {isEnabled && (
                <div className="bg-black p-2 fixed  top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center z-50">

                    <div className="bg-white p-10 rounded " style={{ width: '500px' }}>
                        <div className="flex items-center pb-2">
                            <h1 className="text-lg" >{id}</h1>
                            <h3 className={`font-medium p-1 tracking-wide pl-5 `} style={{ color: orderColor }} >● {status}</h3>
                        </div>

                        <div className="py-5 bg-blue-50">
                            <ObjectPreviewer object={children.user} />
                        </div>

                        <button onClick={deletePermanentHandler} className="bg-gray-200 w-full py-2 px-5 rounded  capitalize my-1 text-sm tracking-wide">Delete Permanent</button>
                        <button onClick={markRefundedHandler} className="bg-gray-200 w-full py-2 px-5 rounded  capitalize my-1 text-sm tracking-wide">Mark as Refunded</button>
                        <button onClick={onClickHandler} className="bg-black text-white w-full py-2 px-5 rounded  capitalize my-1 text-sm tracking-wide">close</button>
                    </div>


                </div>
            )}
        </section>
    )
}



export default Order