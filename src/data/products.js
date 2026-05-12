export const products = [
  // MEN - TOP WEAR
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 2499,
    originalPrice: 3999,
    category: "Men",
    subcategory: "Top Wear",
    type: "T-Shirt",
    gender: "men",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500"
    ],
    description: "Soft, breathable cotton t-shirt perfect for everyday wear. Available in multiple colors.",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy", "Gray"],
    brand: "Nike"
  },
  {
    id: 2,
    name: "Classic Oxford Shirt",
    price: 4999,
    originalPrice: 7499,
    category: "Men",
    subcategory: "Top Wear",
    type: "Shirt",
    gender: "men",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500"
    ],
    description: "Premium Oxford shirt, perfect for office or casual outings. Wrinkle-resistant fabric.",
    rating: 4.7,
    reviews: 95,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Blue", "Pink"],
    brand: "Tommy Hilfiger"
  },
  {
    id: 3,
    name: "Slim Fit Jeans",
    price: 6499,
    originalPrice: 9999,
    category: "Men",
    subcategory: "Bottom Wear",
    type: "Jeans",
    gender: "men",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500"
    ],
    description: "Slim fit jeans with stretch comfort. Modern fit for everyday style.",
    rating: 4.6,
    reviews: 210,
    inStock: true,
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Blue", "Black", "Gray"],
    brand: "Levi's"
  },
  {
    id: 4,
    name: "Chino Pants",
    price: 5499,
    originalPrice: 7999,
    category: "Men",
    subcategory: "Bottom Wear",
    type: "Pants",
    gender: "men",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500"
    ],
    description: "Classic chino pants, comfortable and stylish for any occasion.",
    rating: 4.4,
    reviews: 156,
    inStock: true,
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Khaki", "Navy", "Black"],
    brand: "H&M"
  },

  // WOMEN - TOP WEAR
  {
    id: 5,
    name: "Floral Print Blouse",
    price: 3999,
    originalPrice: 6499,
    category: "Women",
    subcategory: "Top Wear",
    type: "Blouse",
    gender: "women",
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500"
    ],
    description: "Beautiful floral print blouse, perfect for summer days.",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Pink", "White", "Blue"],
    brand: "Zara"
  },
  {
    id: 6,
    name: "Cashmere Sweater",
    price: 10999,
    originalPrice: 16999,
    category: "Women",
    subcategory: "Top Wear",
    type: "Sweater",
    gender: "women",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500"
    ],
    description: "Luxurious cashmere sweater, soft and warm for winter.",
    rating: 4.9,
    reviews: 67,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Gray", "Maroon"],
    brand: "Ralph Lauren"
  },
  {
    id: 7,
    name: "High-Waist Jeans",
    price: 7499,
    originalPrice: 10999,
    category: "Women",
    subcategory: "Bottom Wear",
    type: "Jeans",
    gender: "women",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500",
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500"
    ],
    description: "High-waist skinny jeans, figure-flattering and comfortable.",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    sizes: ["24", "26", "28", "30", "32", "34"],
    colors: ["Blue", "Black", "Light Blue"],
    brand: "American Eagle"
  },
  {
    id: 8,
    name: "Pleated Skirt",
    price: 4499,
    originalPrice: 6999,
    category: "Women",
    subcategory: "Bottom Wear",
    type: "Skirt",
    gender: "women",
    image: "https://images.unsplash.com/photo-1583496661160-f3b2c1623d5b?w=500",
    images: [
      "https://images.unsplash.com/photo-1583496661160-f3b2c1623d5b?w=500",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500"
    ],
    description: "Elegant pleated skirt, perfect for office or parties.",
    rating: 4.5,
    reviews: 143,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy"],
    brand: "H&M"
  },

  // ELECTRONICS
  {
    id: 9,
    name: "Wireless Headphones",
    price: 7999,
    originalPrice: 11999,
    category: "Electronics",
    subcategory: "Audio",
    type: "Headphones",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500"
    ],
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    specs: ["Bluetooth 5.0", "30hr Battery", "Noise Cancellation"],
    brand: "Sony"
  },
  {
    id: 10,
    name: "Smart Watch",
    price: 19999,
    originalPrice: 24999,
    category: "Electronics",
    subcategory: "Wearables",
    type: "Smart Watch",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500"
    ],
    description: "Feature-rich smartwatch with heart rate monitor, GPS, and multiple sports modes.",
    rating: 4.8,
    reviews: 256,
    inStock: true,
    specs: ["Heart Rate Monitor", "GPS", "Water Resistant"],
    brand: "Apple"
  },
  {
    id: 11,
    name: "Laptop",
    price: 79999,
    originalPrice: 99999,
    category: "Electronics",
    subcategory: "Computers",
    type: "Laptop",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500"
    ],
    description: "Powerful laptop with latest processor and long battery life.",
    rating: 4.7,
    reviews: 345,
    inStock: true,
    specs: ["16GB RAM", "512GB SSD", "Intel i7"],
    brand: "Dell"
  },
  {
    id: 12,
    name: "Wireless Earbuds",
    price: 5999,
    originalPrice: 9999,
    category: "Electronics",
    subcategory: "Audio",
    type: "Earbuds",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
      "https://images.unsplash.com/photo-1606220588913-b3aac0ab81f6?w=500"
    ],
    description: "True wireless earbuds with charging case and crystal clear sound.",
    rating: 4.6,
    reviews: 432,
    inStock: true,
    specs: ["Bluetooth 5.0", "20hr Battery", "Water Resistant"],
    brand: "Samsung"
  },

  // FOOTWEAR - MEN
  {
    id: 13,
    name: "Running Shoes",
    price: 6499,
    originalPrice: 9999,
    category: "Footwear",
    subcategory: "Sports",
    type: "Running Shoes",
    gender: "men",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    ],
    description: "Comfortable running shoes with cushioned sole and breathable mesh upper.",
    rating: 4.3,
    reviews: 342,
    inStock: true,
    sizes: ["7", "8", "9", "10", "11", "12"],
    brand: "Nike"
  },
  {
    id: 14,
    name: "Casual Sneakers",
    price: 5499,
    originalPrice: 7999,
    category: "Footwear",
    subcategory: "Casual",
    type: "Sneakers",
    gender: "women",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500"
    ],
    description: "Stylish casual sneakers for everyday wear. Comfortable and durable.",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    sizes: ["5", "6", "7", "8", "9", "10"],
    brand: "Adidas"
  },

  // ACCESSORIES
  {
    id: 15,
    name: "Leather Backpack",
    price: 7499,
    originalPrice: 10999,
    category: "Accessories",
    subcategory: "Bags",
    type: "Backpack",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500"
    ],
    description: "Premium leather backpack with laptop compartment. Perfect for work or travel.",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    brand: "Fossil"
  },
  {
    id: 16,
    name: "Designer Sunglasses",
    price: 12999,
    originalPrice: 16999,
    category: "Accessories",
    subcategory: "Eyewear",
    type: "Sunglasses",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
      "https://images.unsplash.com/photo-1496843916299-590492c751f4?w=500"
    ],
    description: "Polarized sunglasses with UV protection. Classic design that never goes out of style.",
    rating: 4.7,
    reviews: 95,
    inStock: true,
    brand: "Ray-Ban"
  },
  {
    id: 17,
    name: "Leather Wallet",
    price: 2999,
    originalPrice: 4999,
    category: "Accessories",
    subcategory: "Wallets",
    type: "Wallet",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
      "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=500"
    ],
    description: "Genuine leather wallet with multiple card slots and ID window.",
    rating: 4.4,
    reviews: 210,
    inStock: true,
    brand: "Michael Kors"
  },

  // HOME & LIVING
  {
    id: 18,
    name: "Ceramic Coffee Mug",
    price: 1499,
    originalPrice: 2499,
    category: "Home & Living",
    subcategory: "Kitchen",
    type: "Mug",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500",
      "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=500"
    ],
    description: "Ceramic coffee mug with heat-resistant handle. Microwave and dishwasher safe.",
    rating: 4.2,
    reviews: 567,
    inStock: true,
    brand: "Home Essentials"
  },
  {
    id: 19,
    name: "LED Desk Lamp",
    price: 3999,
    originalPrice: 6499,
    category: "Home & Living",
    subcategory: "Lighting",
    type: "Lamp",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500"
    ],
    description: "LED desk lamp with adjustable brightness and color temperature.",
    rating: 4.9,
    reviews: 143,
    inStock: true,
    brand: "Philips"
  },
  {
    id: 20,
    name: "Throw Pillow Set",
    price: 2999,
    originalPrice: 4499,
    category: "Home & Living",
    subcategory: "Decor",
    type: "Pillow",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500",
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=500"
    ],
    description: "Set of 2 decorative throw pillows, perfect for your living room.",
    rating: 4.5,
    reviews: 89,
    inStock: true,
    brand: "HomeGoods"
  },

  // NEW PRODUCTS - WINTER COLLECTION 2024
  {
    id: 21,
    name: "Woolen Beanie Hat",
    price: 1999,
    originalPrice: 3499,
    category: "Accessories",
    subcategory: "Winter Wear",
    type: "Hat",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1534214526114-0ea4d47d04b2?w=500",
    images: [
      "https://images.unsplash.com/photo-1534214526114-0ea4d47d04b2?w=500",
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500"
    ],
    description: "Cozy woolen beanie hat, perfect for cold winter days. One size fits all.",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    sizes: ["One Size"],
    colors: ["Black", "Gray", "Navy", "Burgundy"],
    brand: "North Face"
  },
  {
    id: 22,
    name: "Leather Gloves",
    price: 3999,
    originalPrice: 6499,
    category: "Accessories",
    subcategory: "Winter Wear",
    type: "Gloves",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500",
    images: [
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500",
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500"
    ],
    description: "Premium leather gloves with touchscreen compatible fingertips.",
    rating: 4.7,
    reviews: 56,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    brand: "North Face"
  },
  {
    id: 23,
    name: "Winter Jacket - Men",
    price: 14999,
    originalPrice: 22999,
    category: "Men",
    subcategory: "Top Wear",
    type: "Jacket",
    gender: "men",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500"
    ],
    description: "Heavy-duty winter jacket with fleece lining. Water-resistant outer shell.",
    rating: 4.8,
    reviews: 112,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Olive"],
    brand: "Columbia"
  },
  {
    id: 24,
    name: "Puffer Jacket - Women",
    price: 12999,
    originalPrice: 18999,
    category: "Women",
    subcategory: "Top Wear",
    type: "Jacket",
    gender: "women",
    image: "https://images.unsplash.com/photo-1548624313-3e3e2549a3b2?w=500",
    images: [
      "https://images.unsplash.com/photo-1548624313-3e3e2549a3b2?w=500",
      "https://images.unsplash.com/photo-1548624313-3e3e2549a3b2?w=500"
    ],
    description: "Lightweight puffer jacket perfect for winter layering.",
    rating: 4.7,
    reviews: 98,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Pink"],
    brand: "The North Face"
  },
  {
    id: 25,
    name: "Noise Cancelling Earbuds",
    price: 8999,
    originalPrice: 14999,
    category: "Electronics",
    subcategory: "Audio",
    type: "Earbuds",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1606220588913-b3aac0ab81f6?w=500",
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aac0ab81f6?w=500",
      "https://images.unsplash.com/photo-1606220588913-b3aac0ab81f6?w=500"
    ],
    description: "Active noise cancelling earbuds with 40-hour battery life.",
    rating: 4.9,
    reviews: 567,
    inStock: true,
    specs: ["Active Noise Cancelling", "40hr Battery", "IPX4 Water Resistant"],
    brand: "Bose"
  },
  {
    id: 26,
    name: "Gaming Mouse",
    price: 3499,
    originalPrice: 5999,
    category: "Electronics",
    subcategory: "Computers",
    type: "Mouse",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1615663245857-ac93cf2f1a6f?w=500",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93cf2f1a6f?w=500",
      "https://images.unsplash.com/photo-1615663245857-ac93cf2f1a6f?w=500"
    ],
    description: "RGB gaming mouse with 16000 DPI and programmable buttons.",
    rating: 4.6,
    reviews: 234,
    inStock: true,
    specs: ["16000 DPI", "RGB Lighting", "6 Programmable Buttons"],
    brand: "Razer"
  },
  {
    id: 27,
    name: "Mechanical Keyboard",
    price: 6999,
    originalPrice: 9999,
    category: "Electronics",
    subcategory: "Computers",
    type: "Keyboard",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
    ],
    description: "Mechanical keyboard with blue switches and RGB backlight.",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    specs: ["Blue Switches", "RGB Backlight", "Full Size"],
    brand: "Corsair"
  },
  {
    id: 28,
    name: "Yoga Mat",
    price: 2499,
    originalPrice: 3999,
    category: "Accessories",
    subcategory: "Fitness",
    type: "Mat",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500",
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500",
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500"
    ],
    description: "Eco-friendly non-slip yoga mat for all types of exercise.",
    rating: 4.5,
    reviews: 456,
    inStock: true,
    sizes: ["6mm", "8mm", "10mm"],
    colors: ["Purple", "Blue", "Black"],
    brand: "YogaAccessories"
  },
  {
    id: 29,
    name: "Water Bottle",
    price: 1299,
    originalPrice: 2499,
    category: "Accessories",
    subcategory: "Fitness",
    type: "Bottle",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"
    ],
    description: "Insulated stainless steel water bottle. Keeps drinks cold for 24 hours.",
    rating: 4.7,
    reviews: 789,
    inStock: true,
    sizes: ["500ml", "750ml", "1L"],
    colors: ["Black", "White", "Blue", "Pink"],
    brand: "Hydro Flask"
  },
  {
    id: 30,
    name: "Smartphone Case",
    price: 999,
    originalPrice: 1999,
    category: "Accessories",
    subcategory: "Mobile Accessories",
    type: "Case",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500"
    ],
    description: "Shockproof smartphone case with raised edges for screen protection.",
    rating: 4.3,
    reviews: 1234,
    inStock: true,
    colors: ["Black", "Clear", "Blue", "Red"],
    brand: "Spigen"
  }
];

// Updated categories with subcategories
export const categories = [
  { 
    id: 1, 
    name: "All", 
    icon: "🛍️",
    slug: "all"
  },
  { 
    id: 2, 
    name: "Men", 
    icon: "👨",
    slug: "men",
    subcategories: [
      { name: "Top Wear", types: ["T-Shirt", "Shirt", "Sweater", "Jacket"] },
      { name: "Bottom Wear", types: ["Jeans", "Pants", "Shorts"] },
      { name: "Footwear", types: ["Shoes", "Sneakers", "Sandals"] },
      { name: "Accessories", types: ["Watches", "Bags", "Belts"] }
    ]
  },
  { 
    id: 3, 
    name: "Women", 
    icon: "👩",
    slug: "women",
    subcategories: [
      { name: "Top Wear", types: ["Blouse", "T-Shirt", "Shirt", "Sweater", "Dress", "Jacket"] },
      { name: "Bottom Wear", types: ["Jeans", "Pants", "Skirt", "Shorts"] },
      { name: "Footwear", types: ["Shoes", "Heels", "Flats", "Boots"] },
      { name: "Accessories", types: ["Handbags", "Jewelry", "Scarves"] }
    ]
  },
  { 
    id: 4, 
    name: "Electronics", 
    icon: "📱",
    slug: "electronics",
    subcategories: [
      { name: "Audio", types: ["Headphones", "Earbuds", "Speakers"] },
      { name: "Wearables", types: ["Smart Watches", "Fitness Trackers"] },
      { name: "Computers", types: ["Laptops", "Keyboards", "Mouse", "Accessories"] },
      { name: "Mobile", types: ["Phones", "Cases", "Chargers"] }
    ]
  },
  { 
    id: 5, 
    name: "Footwear", 
    icon: "👟",
    slug: "footwear",
    subcategories: [
      { name: "Men", types: ["Sports", "Casual", "Formal", "Sandals"] },
      { name: "Women", types: ["Sports", "Casual", "Heels", "Flats", "Boots"] }
    ]
  },
  { 
    id: 6, 
    name: "Accessories", 
    icon: "🕶️",
    slug: "accessories",
    subcategories: [
      { name: "Bags", types: ["Backpacks", "Handbags", "Totes"] },
      { name: "Watches", types: ["Analog", "Digital", "Smart"] },
      { name: "Eyewear", types: ["Sunglasses", "Spectacles"] },
      { name: "Wallets", types: ["Leather", "Slim", "Travel"] },
      { name: "Winter Wear", types: ["Hat", "Gloves", "Scarf"] },
      { name: "Fitness", types: ["Mat", "Bottle"] },
      { name: "Mobile Accessories", types: ["Case"] }
    ]
  },
  { 
    id: 7, 
    name: "Home & Living", 
    icon: "🏠",
    slug: "home-living",
    subcategories: [
      { name: "Kitchen", types: ["Mugs", "Utensils", "Appliances"] },
      { name: "Decor", types: ["Pillows", "Frames", "Vases"] },
      { name: "Lighting", types: ["Lamps", "Ceiling Lights", "String Lights"] },
      { name: "Furniture", types: ["Chairs", "Tables", "Storage"] }
    ]
  }
];

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  if (category === "All" || !category) return products;
  return products.filter(product => product.category === category);
};

// Helper function to get products by gender
export const getProductsByGender = (gender) => {
  if (gender === "all" || !gender) return products;
  return products.filter(product => product.gender === gender);
};

// Helper function to get products by subcategory
export const getProductsBySubcategory = (category, subcategory) => {
  return products.filter(product => 
    product.category === category && product.subcategory === subcategory
  );
};

// Helper function to get products by type
export const getProductsByType = (type) => {
  return products.filter(product => product.type === type);
};

// Get unique brands
export const getBrands = () => {
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
  return brands;
};

// Get price range
export const getPriceRange = () => {
  const prices = products.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};