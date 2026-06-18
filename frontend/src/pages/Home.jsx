import { useEffect, useState } from "react";

import ProductCard from
  "../components/ProductCard";

import Navbar from "../components/Navbar";

import {
  getProducts
} from "../services/productService";

function Home() {

    const [darkMode, setDarkMode] =
  useState(false);

const toggleTheme = () => {
  setDarkMode(!darkMode);
};

  const [products, setProducts] =
    useState([]);
  const [search, setSearch] =
  useState("");
  useEffect(() => {

    const fetchProducts =
      async () => {

      try {

        const data =
          await getProducts();

        setProducts(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchProducts();

  }, []);
const filteredProducts =
  products.filter(
    product =>
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );
 return (
  <div className={darkMode ? "dark" : "light"}>

    <Navbar
      darkMode={darkMode}
      toggleTheme={toggleTheme}
    />

      <section className="hero">

        <p className="tag">
          PREMIUM SHOPPING EXPERIENCE
        </p>

        <h1>
          Discover Your Next
          <span> Product</span>
        </h1>

        <p className="subtitle">
          Shop smarter with our
          premium collection.
        </p>

      </section>

<div
  style={{
    padding:
      "0 80px 30px"
  }}
>
  <input
    type="text"
    placeholder=
      "Search products..."
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
    style={{
      width: "100%",
      padding: "15px",
      borderRadius: "10px",
      border:
        "1px solid #ccc",
      fontSize: "16px"
    }}
  />
</div>

<section
  className="products-grid"
>
        {filteredProducts.map(
          (product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          )
        )}
      </section>

    </div>
  );
}

export default Home;