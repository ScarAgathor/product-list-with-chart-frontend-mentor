# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

## My process

I first built the template of each part of the site with html and scss and then used javascript to pupulate the repetitve parts of the sie.


### Built with

- Semantic HTML5 markup
- Flexbox
- CSS Grid
- SCSS/SASS
- Javascript


### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```js
  function createCartItem(atcButton) {
    let amountButtons = atcButton.nextElementSibling
    let productCategory = atcButton.parentElement.nextElementSibling.children[0].textContent
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

```

## Author

- Frontend Mentor - [@ScarAgathor](https://www.frontendmentor.io/profile/scarAgathor)
