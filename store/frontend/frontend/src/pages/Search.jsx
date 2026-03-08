import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Card from "../components/ProductCard";

export default function Search() {

  const { keyword } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      const res = await API.get(
        `/products/search/query?keyword=${keyword}`
      );

      setProducts(res.data);

    };

    fetchProducts();

  }, [keyword]);

  return (

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Search Results
      </h1>

      <div className="grid grid-cols-4 gap-6">

        {products.map((p) => (
          <Card key={p._id} product={p} />
        ))}

      </div>

    </div>

  );

}