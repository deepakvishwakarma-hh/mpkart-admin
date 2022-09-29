import React from 'react'
import Order from "../components/order"
import Header from "../components/header"
import { firestore } from "../firebase.config"
import { onSnapshot, collection } from "firebase/firestore";
import yyyymmddConversion from "../lib/yyyymmddConversion"

export default function Home() {

  const [realtimeOrderSnapshot, setRealtimeOrderSnapshot] = React.useState(false)

  const [filter, setFilter] = React.useState({
    id: false,
    status: false,
    date: false,
    dateValue: false,
  })

  function filterInputOnChangeHandler(e) {
    setFilter({ ...filter, [e.target.name]: e.target.value == "false" ? false : e.target.value })

  }

  // optimization needed ;
  function filterByParamters() {
    const id = filter.id ? realtimeOrderSnapshot.filter(order => order.id.includes(filter.id)) : []
    const status = filter.status ? realtimeOrderSnapshot.filter(order => order.status == filter.status) : []
    //troubling issue.........................................
    const date = filter.date ? realtimeOrderSnapshot.filter(order => yyyymmddConversion(+order.id) == filter.dateValue) : []
    return [...id, ...status, ...date]

  }

  const OrderFlow = (filter.date || filter.id || filter.status) ? realtimeOrderSnapshot && filterByParamters() : realtimeOrderSnapshot

  React.useEffect(() => {
    async function fetchRealtimeOrders() {
      onSnapshot(collection(firestore, "orders"),
        (querySnapshot) => {
          const requiredDataArr = []
          querySnapshot.forEach((doc) => {
            requiredDataArr.push({ ...doc.data(), id: doc.id })
          });
          setRealtimeOrderSnapshot(requiredDataArr)
        });
    }

    if (typeof window !== undefined) {
      fetchRealtimeOrders()
    }

  }, [])


  return (
    <div className="div">
      <div>
        <div className="bg-white p-5  flex">

          <div className="flex">
            <input onChange={filterInputOnChangeHandler} name="id" type={'number'} className="bg-gray-200 px-3 py-1 rounded" placeholder='search by order id' />
          </div>


          <div className='flex '>
            <div className=' flex items-center px-5'>
              <h1>Status</h1>
            </div>


            <div className='h-full  border border-gray-300 px-5'>
              <select name="status" onChange={filterInputOnChangeHandler} id="status" className=" bg-transparent  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-2">
                <option selected value={false}>All</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
                <option value="cancelled">Cancelled</option>
                <option value="failed">Failed</option>
              </select>
            </div>

          </div>


          <div className='flex'>

            <div className=' flex items-center px-5'>
              <h1>Date </h1>
            </div>

            <div className='h-full  border border-gray-300 px-5'>
              <select name="date" onChange={filterInputOnChangeHandler} id="countries" className=" bg-transparent  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-2">
                <option selected value={false}>All</option>
                <option value="select">Select</option>

              </select>
            </div>


            {filter.date && <div className='h-full  border border-gray-300 px-5 flex items-center'>
              <input onChange={filterInputOnChangeHandler} name="dateValue" type={'date'} />
            </div>}
          </div>
        </div>
        <Header />
        {realtimeOrderSnapshot ?
          (<div className="div">
            {OrderFlow.map((order, index) => <Order key={index}>{order}</Order>)}
          </div>) :
          <span className='block  p-10 text-center'>loading...</span>}
      </div>
    </div>
  )
}









