import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../Context/ShopContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Title from "../Components/Title";
import ProductsItem from "../Components/ProductsItem";



const Collections = () => {
  const {products, search , showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
   
    const toggleCategory = (e) => {
      if (category.includes(e.target.value)) {
          setCategory(prev=> prev.filter(item => item !== e.target.value))            
      }

      else{
          setCategory(prev => [...prev, e.target.value])
      }
  }

  useEffect(() => {
      const applyFilter = () => {
          let productsCopy = products.slice();

          if(showSearch && search){
              productsCopy = productsCopy.filter(item => 
                  item.name.toLowerCase().includes(search.toLowerCase())
              );
          }

          if (category.length > 0) {
              productsCopy = productsCopy.filter(item => 
                  category.includes(item.category)
              );
          }

          if (subCategory.length > 0) {
              productsCopy = productsCopy.filter(item =>
                  subCategory.includes(item.subCategory)
              );
          }

          setFilterProducts(productsCopy);
      };

      applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  const toggleSubCategory = (e) => {
      if (subCategory.includes(e.target.value)) {
          setSubCategory(prev => prev.filter(item => item !== e.target.value))
      } else {
          setSubCategory(prev => [...prev, e.target.value])
      }
  } 

  const sortProduct = () => {
      let fpCopy = filterProducts.slice();

      switch(sortType){
          case 'low-high':
              setFilterProducts(fpCopy.sort((a,b) => a.price - b.price));
              break;
          case 'high-low':
              setFilterProducts(fpCopy.sort((a,b) => b.price - a.price));
              break;
          default:
              break;
      }
  };

  useEffect(()=>{
      sortProduct()
  },[sortType])

       
  return(
   <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      
      {/*filter Options */}
      <div className="min-w-60">
          <p className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS 
              <FontAwesomeIcon 
                  icon={faCaretDown} 
                  className={`text-[20px] sm:hidden ${showFilter ? 'rotate-180' : ''}`}
                  onClick={() => setShowFilter(!showFilter)} 
              />
          </p>
          {/*CATERGORY FILTER*/}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? ' ' : 'hidden' } sm:block`}>
              <p className="mb-3 text-sm 
              font-medium">CATEGORIES</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                  <p className="flex gap-2">
                  <input type="checkbox" className="w-3" value={"T-shirt"} onChange={toggleCategory}/> T-shirt
                  </p>

                  <p className="flex gap-2">
                  <input type="checkbox" className="w-3" value={"Accessories"} onChange={toggleCategory}/> Accessories
                  </p>                  
              </div>
          </div>
          {/*SubCategory*/}
          <div className={`border border-gray-300 pl-5 py-3 my-6 ${showFilter ? ' ' : 'hidden' } sm:block`}>
              <p className="mb-3 text-sm 
              font-medium">TYPE</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                  <p className="flex gap-2">
                  <input type="checkbox" className="w-3" value={"Jeka"} onChange={toggleSubCategory}/> Jeka
                  </p>

                  <p className="flex gap-2">
                  <input type="checkbox" className="w-3" value={"Nee-Classics"} onChange={toggleSubCategory}/> Nee-Classics
                  </p>  

                   <p className="flex gap-2">
                  <input type="checkbox" className="w-3" value={"Nee-Caps"} onChange={toggleSubCategory}/> Nee-Caps
                  </p> 

                   <p className="flex gap-2">
                  <input type="checkbox" className="w-3" value={"NC-Tee"} onChange={toggleSubCategory}/> NC-Tee
                  </p>                   
              </div>
          </div>
      </div>

      {/*Rigth Side*/}
      <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
              <Title text1={'ALL'} text2={'COLLECTIONS'} />
              {/*Product Sort */}
              <select onChange={(e)=>setSortType(e.target.value)} className=" border-2 border-gray-300 text-sm px-2">
                 <option value="relavent">Sort by: Relavent</option>
                 <option value="low-high">Sort by: Low to High</option>
                 <option value="high-low">Sort by: High to Low</option>
              </select>
          </div>
          {/*Map Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {filterProducts?.length > 0 ? (
                  filterProducts.map((item, index) => (
                      <ProductsItem 
                          key={index} 
                          name={item.name} 
                          id={item._id} 
                          price={item.price}
                          image={item.image} 
                      />
                  ))
              ) : (
                  <p className="col-span-full text-center text-gray-500">No products found</p>
              )}
          </div>
      </div>

   </div>   

  )
}

export default Collections