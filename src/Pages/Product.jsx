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
        // Support both new imgUrls[] and legacy imgUrl string
        const images = item.imgUrls?.length
          ? item.imgUrls
          : item.imgUrl
          ? [item.imgUrl]
          : [];
        setImage(images[0] ?? "");
        return null;
      }
      return null;
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [products]);

  return productData ? (
    <div className="border-t border-border/40 pt-10 transition-opacity ease-in duration-500 opacity-100 text-foreground">
      {/*Product Data */}

      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*------Product images (LEFT COLUMN)---------*/}
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          {/* Main image */}
          <div className="w-full sm:w-[75%] rounded-2xl overflow-hidden border border-border/40 bg-muted">
            <img
              src={image}
              className="w-full h-auto object-cover aspect-square"
              alt={productData.name}
            />
          </div>

          {/* Thumbnail strip */}
          <div className="flex flex-row overflow-x-auto sm:flex-col sm:overflow-y-auto sm:w-[18.7%] w-full gap-2 py-2">
            {(productData.imgUrls?.length
              ? productData.imgUrls
              : productData.imgUrl
              ? [productData.imgUrl]
              : []
            ).map((url, i) => (
              <img
                key={i}
                src={url}
                onClick={() => setImage(url)}
                alt={`Thumbnail ${i + 1}`}
                className={`flex-shrink-0 cursor-pointer border-2 transition-all rounded-lg object-cover aspect-square bg-muted
                  ${image === url ? "border-foreground" : "border-border/40"}
                  w-[20%] sm:w-[70%] sm:h-auto`}
              />
            ))}
          </div>
        </div>

        {/*-----Products Details (RIGHT COLUMN)------- */}
        <div className="flex-1">
          <h1 className="font-bold text-3xl tracking-tight text-foreground">{productData.name}</h1>
          
          <div className="mt-4 flex flex-col gap-1">
            {productData.originalPrice && (
              <div className="flex items-center gap-2">
                <p className="text-lg text-muted-foreground line-through">
                  {currency}
                  {productData.originalPrice.toLocaleString()}
                </p>
                <span className="bg-red-500/90 text-white text-[10px] tracking-wider font-extrabold px-2 py-1 rounded-full uppercase">
                  {productData.discountPercentage}% OFF
                </span>
              </div>
            )}
            <p className="text-3xl font-extrabold text-red-500">
              {currency}
              {productData.price.toLocaleString()}
            </p>
          </div>

          <p className="mt-5 text-muted-foreground md:w-4/5 leading-relaxed">
            {productData.description}
          </p>

          <p className="text-sm text-muted-foreground font-semibold flex items-center gap-2 mt-4">
            Availability: <span className="text-foreground">{productData.availability}</span>
          </p>

          <div className="flex flex-col gap-3 my-8">
            <p className="font-semibold text-sm tracking-wide text-foreground uppercase">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2.5 px-5 font-semibold text-sm rounded-lg transition-all cursor-pointer
                    ${item === size 
                      ? "border-foreground bg-foreground text-background" 
                      : "border-border/60 bg-muted hover:border-border text-foreground"
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
            className="bg-foreground text-background hover:bg-foreground/90 transition-colors px-10 py-3.5 text-sm font-semibold rounded-lg tracking-wider cursor-pointer"
            onClick={() => addToCart(productData.id, size)}
          >
            ADD TO CART
          </button>
          
          <hr className="mt-8 border-border/40 sm:w-4/5" />
          
          <div className="text-sm text-muted-foreground mt-6 flex flex-col gap-2">
            <p>✓ 100% Original Product</p>
            <p>✓ Cash on delivery is available</p>
            <p>✓ Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/*---------Description & Review Section-------- */}
      <div className="mt-20">
        <div className="flex border-b border-border/40">
          <b className="border-t border-x border-border/60 bg-card text-foreground px-6 py-3 text-sm rounded-t-lg font-bold">Description</b>
          <p className="text-muted-foreground px-6 py-3 text-sm cursor-pointer hover:text-foreground transition-colors">Reviews</p>
        </div>

        <div className="flex flex-col gap-4 border border-t-0 border-border/60 bg-card/20 backdrop-blur-md px-6 py-6 text-sm text-muted-foreground rounded-b-lg">
          <p>This premium streetwear fit is designed with heavy-cotton blends to provide maximum comfort and durabiliy. Each custom piece is dyed to preserve rich shades after washing.</p>
          <p>Style with cargo trousers or classic distressed jeans for a modern streetwear aesthetic.</p>
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
