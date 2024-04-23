import { ItemCard, WidgetItem } from "@/components";
import { products, type Product } from "@/data/products/products";
import { cookies } from "next/headers";


export const metadata = {
    title: 'Shopping cart',
    description: 'Shopping cart',
};

interface ProductInCart{
    product: Product;
    quantity: number;
}

const getProductsInCart = ( cart: { [x: string]: number } ) => {
    const productsInCart: ProductInCart[] = [];
    for (const uuid of Object.keys(cart)) {
        const product = products.find( product => product.id === uuid );
        if(product){
            productsInCart.push({
                product,
                quantity: cart[uuid]
            })
        }
    }

    return productsInCart;
}

export default function CardPage() {

    const cookiesStore = cookies();
    const cart = JSON.parse( cookiesStore.get('cart')?.value as string || '{}');
    const productsInCart = getProductsInCart( cart );

    const totalToPay = productsInCart.reduce( (prev, current) => prev + (current.product.price * current.quantity), 0 )
    

    return (
        <div>
            <h1 className="text-5xl">Productos en el carrito</h1>
            <hr className="mb-2"/>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col gap-2 w-full sm:w-8/12">
                    {
                       productsInCart.map(({ product, quantity }) => (
                            <ItemCard key={ product.id } product={ product } quantity={ quantity } />
                       ))
                    }
                </div>
                <div className="flex flex-col w-full  sm:w-4/12">
                    <WidgetItem title="Total a Pagar">
                        <div className="m-2 flex justify-center gap-4">
                            <h3 className="text-3xl font-bold text-gray-700">Total: ${ (totalToPay * 1.15).toFixed(2) }</h3>
                        </div>
                        <span className="font-bold text-center text-gray-500">Impuestos 15%: $ { ((totalToPay * 1.15) - totalToPay).toFixed(2) } </span>
                    </WidgetItem>
                </div>
            </div>
        </div>

    );
}