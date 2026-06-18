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

      <section
        className="products-grid"
      >
        {products.map(
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