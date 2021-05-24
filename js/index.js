// back to top script

let backToTopBtn = document.querySelector('.back-to-top');

window.onscroll = () => {
    if(document.body.onscrollTop>200 || document.documentElement.scrollTop > 200){
        backToTopBtn.style.display = 'flex';
    }else{
        backToTopBtn.style.display = 'none';
    }
}

//Top nav mmenu
let menuItems = document.getElementsByClassName('menu-item');
Array.from(menuItems).forEach((item,index)=>{
    item.onclick = (e) => {
        let currMenu = document.querySelector('.menu-item.active')
        currMenu.classList.remove('active')
        item.classList.add('active');
    }
})

//food category

let foodMenuList = document.querySelector('.food-item-wrap');

let foodCategory = document.querySelector('.food-category');

let categories = document.querySelectorAll('button');

Array.from(categories).forEach((item, index) => {
    item.onclick = (e) => {
        let currCat = foodCategory.querySelector('button.active');
        currCat.classList.remove('active');
        e.target.classList.add('active');
        foodMenuList.classList ='food-item-wrap '+ e.target.getAttribute('data-food-type');
    }
});

//on scroll animation
let scroll = window.requestAnimationFrame || function(callback) {window.setTimeout(callback, 1000/60)}

let elToShow = document.querySelectorAll('.play-on-scroll');

isElInViewPort = (el) => {
    let rect = el.getBoundingClientRect()

    return (
        (rect.top <= 0 && rect.bottom >= 0)
        ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
        ||
        (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    )
}

loop = () => {
    elToShow.forEach((item, index) => {
        if (isElInViewPort(item)) {
            item.classList.add('start');
        } else {
            item.classList.remove('start');
        }
    })

    scroll(loop);
}

loop();

// mobile nav

let bottomNavItems = document.querySelectorAll('.mb-nav-item')

let bottomMove = document.querySelector('.mb-move-item')

bottomNavItems.forEach((item, index) => {
    item.onclick = (e) => {
        console.log('object')
        let crrItem = document.querySelector('.mb-nav-item.active')
        crrItem.classList.remove('active')
        item.classList.add('active')
        bottomMove.style.left = index * 25 + '%'
    }
})



//addcart

let carts = document.querySelectorAll('.cart-btn');

function randomId(){
    return Math.floor(Math.random() * 100000);
}

let products = [
    {
        name:'Lorem ipsum1',
        tag:'food1',
        price:120,
        inCart:0
    },
    {
     
        name:'Lorem ipsum2',
        tag:'food2',
        price:130,
        inCart:0
    },
    {
       
        name:'Lorem ipsum3',
        tag:'food3',
        price:140,
        inCart:0
    },
    {
      
        name:'Lorem ipsum4',
        tag:'food4',
        price:150,
        inCart:0
    },
    {
        
        name:'Lorem ipsum5',
        tag:'food5',
        price:160,
        inCart:0
    },
    {
        
        name:'Lorem ipsum6',
        tag:'food6',
        price:170,
        inCart:0
    },
    {
        
        name:'Lorem ipsum7',
        tag:'food7',
        price:180,
        inCart:0
    },
    {
        
        name:'Lorem ipsum8',
        tag:'food8',
        price:190,
        inCart:0
    }
]

for (let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onloadCartNumber(){
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
   }
    
}

function cartNumbers(product){

    // console.log("The product clicked is", product);

    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
    
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
        
    } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);

}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems =JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }

        cartItems[product.tag].inCart += 1; 
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
   
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    // console.log("the product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    // console.log("may cart cost is", cartCost);
    // console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +product.price)
    }else{
        localStorage.setItem("totalCost", product.price);
    }

}

onloadCartNumber();

