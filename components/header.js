const Header = () => {
    return (
        <div style={{ fontWeight: 500 }} className='grid grid-cols-5 gap-2 text-sm uppercase   bg-gray-200  py-5 px-2 tracking-wider'>
            <h5>Status</h5>
            <h5>Date & Time</h5>
            <h5>Order Id</h5>
            <h5>Address</h5>
            <h5>Link</h5>
        </div>
    )
}

export default Header