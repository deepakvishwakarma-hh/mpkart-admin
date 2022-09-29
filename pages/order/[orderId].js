import { firestore } from "../../firebase.config"
import { client, urlFor } from "../../lib/client"
import { getDoc, doc } from "firebase/firestore"
import ObjectPreviewer from "../../components/object-previewer"

const Delivery = ({ address, products, status }) => {


    if ((address || products) == undefined) return <div className="absolute w-screen h-screen top-0 left-0 z-50 bg-white"> order not found  </div >

    const orderColor = status == 'paid' ? 'green' : status == 'cancelled' ? 'red' : 'blue'


    return (
        <div className=" bg-white">
            <h1 style={{ borderBottomColor: orderColor }} className="p-5 shadow-md text-center sticky top-0 w-full bg-white capitalize tracking-wide border-b-2 ">status : {status}</h1>


            <div className="p-2">
                <h2 className='font-medium  px-2 py-4 text-lg'>Address Details</h2>
                <ObjectPreviewer object={address} />
            </div>

            <div className="p-2">
                <h2 className='font-medium  px-2 py-4 text-lg'>Products Details</h2>

                <div className="flex flex-col">
                    {products.map((item, index) => <div className=" py-2 my-5 rounded border-2 border-blue-200" key={index} > <ObjectPreviewer object={item} /></div>
                    )}
                </div>

            </div>

        </div>
    )
}

export default Delivery


export async function getServerSideProps(ctx) {

    let productsArr = []

    const id = ctx.params.orderId

    try {
        const ref = doc(firestore, 'orders', id)
        const document = await getDoc(ref)
        const filteredDocument = document.data()

        const query = `*[_type == "product"]`
        const sanity = await client.fetch(query)

        sanity?.forEach((product) => {
            filteredDocument?.products?.forEach(({ productId, productVarientKey, quantity, size }) => {
                if (product._id == productId) {
                    const varient = product?.varients?.filter(({ _key }) => _key === productVarientKey)[0]
                    productsArr.push({
                        'size': size,
                        'quantity': quantity,
                        'product-id': product._id,
                        'product-name': product.name,
                        'varient-name/color ': varient.name,
                        'varient-image-url': urlFor(varient.image[0]).url(),
                        'CMS-url': `https://commerse.sanity.studio/desk/product;${product._id}`,
                    })
                }
            })
        })



        return {
            props: {
                address: filteredDocument.address,
                products: productsArr,
                status: filteredDocument.status
            }
        }
    } catch {
        return {
            props: {
                notFound: true
            }
        }
    }

}


