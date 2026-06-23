const inputProductName = document.querySelector('.product-name')
const inputProductPrice = document.querySelector('.product-price')
const inputProductQty = document.querySelector('.product-qty')
const inputProductCategory = document.querySelector('.product-category')
const addProductBtn = document.querySelector('.add-product');


// create array to store all produts detail
let products = [];

// function of render products 
function renderProducts () {


    // count total products  qty
    const totalProductsQty = products.reduce((acc , item) =>{
        
        return acc += item.qty;

    },0);
    // show total products qty on cards
    const totalProducts = document.querySelector('.total-products');
    totalProducts.textContent = totalProductsQty;
    console.log(totalProductsQty);


    // count total value of inventry 
    const totalInventryValue = products.reduce((acc , item) =>{
        return  Number(acc += item.price * item.qty);
    },0);

    // show total inventory value  on cards
    const totalInventryPrice =  document.querySelector('.total-inventry-price');
    totalInventryPrice.textContent = totalInventryValue;

      // find highest product price 
      const highestPriceProduct = products.reduce((acc, item) =>{
             
        return acc.price > item.price ? acc : item;
      }, products[0]);

      
   // show highest product name and price on the cards
     const highestproductName = document.querySelector('.highest-product-name');
     highestproductName.textContent = highestPriceProduct.name;

     const highestproductPrice = document.querySelector('.highest-product-price');
     highestproductPrice.innerHTML = highestPriceProduct.price;

   // show out of stock product on cards
    const outOfStockProducts = products.filter(product => product.qty < 2);

    // get only names of out of stock products 
    const outOfStockProductName = outOfStockProducts.map(product => product.name);
    
    const showOutOfStockProduct = document.querySelector('.low-stock-items');
    showOutOfStockProduct.textContent = outOfStockProductName.join(', ');

       
     // show products lists and details  on display

   const productsContainer = document.querySelector('.products-container');
   

 // clear the products container 
 productsContainer.innerHTML = '';
       
   
    // get products names onyl and show them to the new div
    products.forEach((product) =>{
       console.log(product.name);

       // create new row for each product
       const productRow = document.createElement('div');
       productRow.classList.add('productRow');

        // create new product nanme,  price , qty , category
    const productName = document.createElement('div');
       productName.textContent = product.name;

    const productPrice = document.createElement('div');
      productPrice.textContent = product.price;

    const productQty = document.createElement('div');
      productQty.textContent = product.qty;

    const productCategory = document.createElement('div');
      productCategory.textContent = product.category;




  productRow.appendChild(productName);
 productRow.appendChild(productPrice);
 productRow.appendChild(productQty);
 productRow.appendChild(productCategory);

// add products names price and qty to the container
     productsContainer.appendChild(productRow);

 
    })
    


}

const savedProducts = 
JSON.parse(localStorage.getItem('products'));



//Now if localStorage contains products, 
// they will be loaded.
if(savedProducts){
  products = savedProducts;
  renderProducts();
}

// create funtion  to add products detail

function addProducts () {
    
    // add all products data into products array
    products.push({

        name : inputProductName.value,
        price : inputProductPrice.value,
        qty : Number(inputProductQty.value),
        category : inputProductCategory.value
    })

// store every new added products in local storage 
localStorage.setItem
('products', JSON.stringify(products));



// renderign data function 
renderProducts(); 

  
}
addProductBtn.addEventListener('click',addProducts )