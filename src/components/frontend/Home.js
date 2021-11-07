import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "../../layouts/frontend/Slider";
import ProductCategory from "./ProductCategory";

const Home = () => {
  document.title = "E-Commerce";

  const [category, setcategory] = useState([]);

  useEffect(() => {
    axios.get(`/api/getCategory`).then((res) => {
      if (res.data.status === 200) {
        setcategory(res.data.category);
      }
    });
  }, []);

  var category_HTML = "";
  category_HTML = category.map((item) => {
    return <ProductCategory key={item.id} slug={item.slug} />;
  });

  return (
    <div>
      <div className="container-fluid m-0 p-0">
        <Slider />
        {category_HTML}
      </div>
    </div>
  );
};

export default Home;
