import React, { useState } from "react";
import Filter from "./component/Filter";
import Product from "./component/product";
import { products } from "./data.json";
import "./index.css";

function App() {
  const [productData, setProductData] = useState({
    prod: products,
    size: "",
    sort: "",
  });

  const handleSort = (e) => {
    console.log(productData.sort);
    setProductData({
      sort: e.target.value,
      prod: productData.prod
        .slice()
        .sort((a, b) =>
          productData.sort === "lowest"
            ? a.price < b.price
              ? 1
              : -1
            : productData.sort === "highest"
            ? a.price > b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    });
  };

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setProductData({
        size: e.target.value,
        prod: products,
      });
    } else {
      setProductData({
        size: e.target.value,
        prod: products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/">Babus Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={productData.prod.length}
              handleSort={handleSort}
              handleFilter={handleFilter}
              size={productData.size}
              sort={productData.sort}
            />
            <Product products={productData.prod} />
          </div>
          <div className="sidebar">Cart Item</div>
        </div>
      </main>
      <footer>All Right Reserve.</footer>
    </div>
  );
}

export default App;
