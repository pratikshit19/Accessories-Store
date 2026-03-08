import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="group cursor-pointer rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition">
        <div className="overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-700 font-medium">₹{product.price}</p>
          <span className="text-sm text-gray-500">
            {product.category || "Uncategorized"}
          </span>
        </div>
      </div>
    </Link>
  );
}