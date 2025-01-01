import logo_icon1 from "./IMG_0449-No-bg.png";
import img1 from "./IMG_0450.PNG";
import img2 from "./IMG_0491.PNG";
import img3 from "./IMG_0610.JPG";
import img4 from "./IMG_0708.jpg";
import img5 from "./IMG_1085.PNG";
import img6 from "./IMG_1088.JPG";
import img7 from "./IMG_1091.PNG";
import img8 from "./IMG_1103.PNG";
import img9 from "./IMG_1128.PNG";
import img10 from "./IMG_1247.PNG";
import img11 from './NC (1).png';
import img12 from './NC.png';
import home_img from "./Logo.png";
import quality_icon from './quality.png';
import contact_img from './contact-img.jpg'



export const assets = {
    logo_icon1,
    home_img ,
    img8,
    quality_icon,
    contact_img
}

export const products = [
    {
        _id: "001",
        name: "NEE Classic Tee I",
        description: "Premium cotton classic fit t-shirt with NEE signature logo",
        price: 20000,
        image: [img8],
        category: "T-shirt",
        subCategory: "Nee-Classics",
        sizes: [ "L", "XL"],
        colors: ["Black", "White"],
        inStock: true,
        
    },
    {
        _id: "002",
        name: "NEE Classic Tees II",
        description: "Comfortable streetwear with premium blend fabric",
        price: 20000,
        image: [img9],
        category: "T-shirt",
        subCategory: "Nee-Classics",
        sizes: ["L", "XL"],
        colors: ["Black"],
        inStock: true,
        limitedEdition: false,
      
    },
    {
        _id: "003",
        name: "NEE Classic Tees III",
        description: "Stylish wear with modern fit",
        price: 20000,
        image: [img10],
        category: "T-shirt",
        subCategory: "Nee-Classics",
        sizes:["L", "XL"],
        colors: ["White"],
        inStock: true,
        limitedEdition: false,
   
    },
    {
        _id: "004",
        name: "NEE H-Beanies",
        description: "Cozy knit beanie with NEE embroidered design, perfect for style and warmth",
        price: 6000,
        image: [img4],
        category: "Accessories",
        subCategory: "Nee-Caps",
        sizes: ["S","M"],
        colors: ["Black", "Yellow","Blue"],
        inStock: true,
        limitedEdition: false,
       
    },
    {
        _id: "005",
        name: "B-Trucker",
        description: "Cozy knit beanie with NEE embroidered design, perfect for style and warmth",
        price: 9000,
        image: [img2],
        category: "Accessories",
        subCategory: "Nee-Caps",
        sizes: ["S","M"],
        colors: ["Green", "Blue","Black","Purple","Brown","Pink"],
        inStock: true,
        limitedEdition: false,
        
    },
    {
        _id: "006",
        name: "Jeka Tees",
        description: "",
        price: 18000,
        image: [img7],
        category: "T-shirt",
        subCategory: "Jeka",
        sizes:["L", "XL"],
        colors: ["Black/Green", "White/Green"],
        inStock: true,
        limitedEdition: false,
       
    },
    {
        _id: "007",
        name: "OFF Tees",
        description: "",
        price: 18000,
        image: [img6],
        category: "T-shirt",
        subCategory: "OFF",
        sizes:["L", "XL"],
        colors: ["Black", "White"],
        inStock: true,
        limitedEdition: false,
        
    },
      {_id: "008",
        name: "NEE Classic Tees IV",
        description: "Stylish wear with good quality material",
        price: 18000,
        image: [img5],
        category: "T-shirt",
        subCategory: "Nee-Classics",
        sizes:["L", "XL"],
        colors: ["White"],
        inStock: true,
        limitedEdition: false,
        
    },

    { _id: "009",
        name: "NEE Classic Tees V",
        description: "Quality Fancy Hats Off Tees",
        price: 20000,
        image: [img1], 
        category: "T-shirt",
        subCategory: "Nee-Classics",
        sizes:["L", "XL"],
        colors: ["White"],
        inStock: true,
        limitedEdition: false,
       
},
    {_id: "010",
    name: "NEE Classic Tees VI", 
    description: "Stylish wear with modern fit",
    price: 20000,
    image: [img3],
    category: "T-shirt",
    subCategory: "Nee-Classics",
    sizes:["L", "XL"],
    colors: ["White"],
    inStock: true,
    limitedEdition: false,
   
},

{_id: "011",
    name: "NC Tee I LE", 
    description: "Stylish wear with modern fit",
    price: 20000,
    image: [img11],
    category: "T-shirt",
    subCategory: "NC-Tee",
    sizes:["L", "XL"],
    colors: ["White"],
    inStock: true,
    limitedEdition: true,
   
},

{_id: "012",
    name: "NC Tee II LE", 
    description: "Stylish wear with modern fit",
    price: 20000,
    image: [img12],
    category: "T-shirt",
    subCategory: "NC-Tee",
    sizes:["L", "XL"],
    colors: ["White"],
    inStock: true,
    limitedEdition: true,
   
},

]