import { ProductCard } from "@/components";
import { products } from "@/data/products/products";


export const metadata = {
    title: 'Products Page',
    description: 'Products Page',
};

export default function ProductsPage() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {
                products.map( product => (
                    <ProductCard key={ product.id } { ...product } />
                ))
            }
            
        </div>
    );
}