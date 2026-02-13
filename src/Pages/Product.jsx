import { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import RelatedProducts from "../Components/RelatedProducts";

const Product = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const buttonRef = useRef(null);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item.id === productId) {
        setProductData(item);
        setImage(Array.isArray(item.imgUrl) ? item.imgUrl : [item.imgUrl]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [products]);
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/*Product Data */}

      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*------Product images---------*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            <img
              src={productData.imgUrl}
              className="w-[50%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              onClick={() => setImage(productData.imgUrl)}
              alt=""
            />
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              onClick={() => setImage(productData.imgUrl)}
              className="w-full h-auto"
              alt=""
            />
          </div>
        </div>

        {/*-----Products Detaails------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="mt-5 flex flex-col gap-1">
            {productData.originalPrice && (
              <div className="flex items-center gap-2">
                <p className="text-xl text-gray-500 line-through">
                  {currency}
                  {productData.originalPrice.toLocaleString()}
                </p>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {productData.discountPercentage}% OFF
                </span>
              </div>
            )}
            <p className="text-3xl font-medium text-red-600">
              {currency}
              {productData.price.toLocaleString()}
            </p>
          </div>
          <p className="mt-5 text-gray-600 md:w-4/5 mb-5">
            {productData.description}
          </p>
          <p className="text-sm text-gray-500 font-semibold flex items-center gap-2">
            {productData.availability}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 font-semibold ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            ref={buttonRef}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={() => addToCart(productData.id, size)}
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sms:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on deleivery is availble</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/*---------Description & Review Section-------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 ">
          <p></p>
          <p></p>
        </div>
      </div>

      {/*-----Display ------- */}

      <RelatedProducts
        category={productData.category}
        subCategory={productData.type}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
