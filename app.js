const cartEmpty = document.querySelector('[data-cart-empty]')
const cartNotEmpty = document.querySelector('[data-cart-not-empty]')
const itemContainer = cartNotEmpty.firstElementChild
const productList = document.querySelector('[data-product-list]')
const orderList = document.querySelector('[data-order-list]')
let filename = 'data.json'

displayProducts()

function displayProducts() {
    fetch(filename)
    .then(response => {
        if(response.status != 200) {
            console.log('Error Fetching File')
        } else {
            return response.json()
        }
    })
    .then(data => {
        for(let i = 0; i < data.length; i++) {
            let product = document.createElement('div')

            product.classList.add('product')
            productList.appendChild(product)

            product.innerHTML = `
                <div class="product__container">
                    <picture>
                        <source media="(min-width: 1110px)" srcset="${data[i].image.desktop}">
                        <source media="(min-width: 768px)" srcset="${data[i].image.desktop}">
                        <img src="${data[i].image.desktop}" alt="">
                    </picture>

                    <button class="atc__button" onclick="createCartItem(this)">
                        <img src="assets/images/icon-add-to-cart.svg" alt="">
                        <span>Add to Cart</span>
                    </button>                 

                    <div class="amount__buttons amount__buttons--display">
                        <button class="amount__button" onclick="decreaseAmount(this)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
                        </button>
                        <span>1</span>
                        <button class="amount__button" onclick="increaseAmount(this)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                        </button>
                    </div>
                </div>
                <div class="product__info">
                    <p class="product__category">${data[i].category}</p>
                    <p class="product__name">${data[i].name}</p>
                    <p class="product__price">$${data[i].price.toFixed(2)}</p>
                </div>
            `
        }   
    })
}

function createCartItem(atcButton) {
    let amountButtons = atcButton.nextElementSibling
    let productName = atcButton.parentElement.nextElementSibling.children[1].textContent
    let productPrice = atcButton.parentElement.nextElementSibling.children[2].textContent

    if(cartEmpty.classList.contains('cart__items--empty--display') == false) {
        cartEmpty.classList.add('cart__items--empty--display')
        cartNotEmpty.classList.remove('cart__items--added--display')
    }

    let cartItem = document.createElement('div')
    cartItem.classList.add('cart__item')
    itemContainer.appendChild(cartItem)
    cartItem.innerHTML  = `
        <div class="cart__item__info">
            <p class="cart__item__name">${productName}</p>
            <p class="cart__item__numbers">
                <span class="cart__item__amount">${1}x</span>
                <span class="cart__item__price">@${productPrice}</span>
                <span class="cart__item__price--total">${productPrice}</span>
            </p>
        </div>

        <button class="cart__button--remove" onclick="removeCartItem(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
        </button>
    `

    atcButton.classList.add('atc__button--display')
    amountButtons.classList.remove('amount__buttons--display')
    updateCartAmountAndTotal()
}

function removeCartItem(removeButton) {
    let cartItem = removeButton.parentElement;
    let itemName = removeButton.previousElementSibling.firstElementChild
    

    itemContainer.removeChild(cartItem)

    for(let i = 0; i < productList.children.length; i++) {
        let productName = productList.children[i].lastElementChild.firstElementChild.nextElementSibling

        if(productName.textContent == itemName.textContent) {
            let product = productName.parentElement.parentElement
            let atcButton = product.firstElementChild.children[1]
            let amountButtons = product.firstElementChild.lastElementChild
            let productAmount = amountButtons.children[1]
            atcButton.classList.remove('atc__button--display')
            amountButtons.classList.add('amount__buttons--display')
            productAmount.textContent = String(1)
        }
    }
    updateCartAmountAndTotal()
    updateCartAppearance()
}

function updateCartAppearance() {
    if(itemContainer.children.length == 0 && cartEmpty.classList.contains('cart__items--empty--display')) {
        cartEmpty.classList.remove('cart__items--empty--display')
        cartNotEmpty.classList.add('cart__items--added--display')
    }
}

function updateCartAmountAndTotal() {
    let cartItems = itemContainer.children
    
    let amount = 0;
    let total = 0

    for(let i = 0; i < cartItems.length; i++) {
        amount += Number(cartItems[i].firstElementChild.lastElementChild.firstElementChild.textContent.slice(0, -1))
        total += Number(cartItems[i].firstElementChild.lastElementChild.lastElementChild.textContent.slice(1))

    }

    document.getElementById('amount').textContent = String(amount)
    document.getElementById('cart-total').textContent = String(total.toFixed(2))
}

function increaseAmount(button) {
    let productAmount = button.previousElementSibling;
    let productName = button.parentElement.parentElement.nextElementSibling.children[1]
    let amount;
    amount = Number(productAmount.textContent)
    amount += 1
    productAmount.textContent = String(amount)

    for(let i = 0; i < itemContainer.children.length; i++) {
        let itemName = itemContainer.children[i].firstElementChild.firstElementChild

        if(productName.textContent == itemName.textContent) {
            let item = itemName.parentElement.parentElement
            let itemAmount = item.firstElementChild.lastElementChild.firstElementChild
            let itemPrice = item.firstElementChild.lastElementChild.children[1]
            let itemTotal = item.firstElementChild.lastElementChild.lastElementChild
            itemAmount.textContent = `${String(amount)}x`
            itemTotal.textContent = `$${String((amount * Number(itemPrice.textContent.slice(2))).toFixed(2))}`
        }
    }
    updateCartAmountAndTotal()
}

function decreaseAmount(button) {
    let productAmount = button.nextElementSibling;
    let productName = button.parentElement.parentElement.nextElementSibling.children[1]
    let amount;
    amount = Number(productAmount.textContent)
    amount -= 1

    productAmount.textContent = String(amount)

    
    for(let i = 0; i < itemContainer.children.length; i++) {
        let itemName = itemContainer.children[i].firstElementChild.firstElementChild

        if(productName.textContent == itemName.textContent) {
            let item = itemName.parentElement.parentElement
            let itemAmount = item.firstElementChild.lastElementChild.firstElementChild
            let itemPrice = item.firstElementChild.lastElementChild.children[1]
            let itemTotal = item.firstElementChild.lastElementChild.lastElementChild
            itemAmount.textContent = `${String(amount)}x`
            itemTotal.textContent = `$${String((amount * Number(itemPrice.textContent.slice(2))).toFixed(2))}`

            if(amount < 1) {
                let product = productName.parentElement.parentElement
                let atcButton = product.firstElementChild.children[1]
                let amountButtons = product.firstElementChild.lastElementChild
                itemContainer.removeChild(item)
                atcButton.classList.remove('atc__button--display')
                amountButtons.classList.add('amount__buttons--display')
                productAmount.textContent = String(1)
            }
        
        }
    }
    updateCartAmountAndTotal()
    updateCartAppearance()
}

function confirmOrder() {
    const overlay = document.getElementById('overlay')
    overlay.classList.remove('overlay--display')

    fetch(filename)
    .then(response => {
        if(response.status != 200) {
            console.log('Error Fetching File')
        } else {
            return response.json()
        }
    })
    .then(data => {
        let orderTotal = 0
        for(let i = 0; i < itemContainer.children.length; i++) {
            let item = itemContainer.children[i]
            let itemName = item.firstElementChild.firstElementChild
            let itemAmount = item.firstElementChild.lastElementChild.firstElementChild
            let itemPrice = item.firstElementChild.lastElementChild.children[1]
            let itemTotal = item.firstElementChild.lastElementChild.lastElementChild
            for(let i = 0; i < data.length; i++) {
                if(itemName.textContent == data[i].name) {
                    let orderItem = document.createElement('div')
                    orderItem.classList.add('order__item')
                    orderList.appendChild(orderItem)
                    orderItem.innerHTML = `
                        <div class="order__item__info">
                            <img src="${data[i].image.thumbnail}" alt="">
                            <div class="item__text">
                                <p class="item__name">${itemName.textContent}</p>
                                <p class="item__price__amount"><span class="amount">${itemAmount.textContent}</span><span class="price">${itemPrice.textContent}</span></p>
                            </div>
                        </div>
                        <p class="order__item__total">${itemTotal.textContent}</p>          
                    `
                }   
            }

            orderTotal += Number(itemTotal.textContent.slice(1))
            document.getElementById('order-total').textContent = String(orderTotal.toFixed(2))
        }
    })
}

function startNewOrder() {
    const overlay = document.getElementById('overlay')
    overlay.classList.add('overlay--display')
    for(let i = 0; i < productList.children.length; i++) {
        let product = productList.children[i]
        let atcButton = product.firstElementChild.children[1]
        let amountButtons = product.firstElementChild.lastElementChild
        let productAmount = amountButtons.children[1];
        atcButton.classList.remove('atc__button--display')
        amountButtons.classList.add('amount__buttons--display')
        productAmount.textContent = String(1)
    }

    while(itemContainer.firstChild) {
        itemContainer.removeChild(itemContainer.lastChild)
        updateCartAmountAndTotal()
        updateCartAppearance()
    }

    while(orderList.firstChild) {
        orderList.removeChild(orderList.lastChild)
    }   
}