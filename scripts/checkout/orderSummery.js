import { cart, removecart,UpdateDelivery } from '../../data/cart.js';
import {products}from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryoption } from '../../data/deliveryoption.js';

// const today = dayjs();
// const delivery = today.add(7, 'day');
// console.log(delivery.format('dddd, MMM D'));
export function ordersummery(){


let cartsummery = '';
cart.forEach((cartitem) => {
  const productId = cartitem.productId;
  let matchingpro;
  products.forEach((product) => {
    if (productId == product.id) {
      matchingpro = product;
    }
  });
  const deliveryOptid=cartitem.deliveryoptionid;
  let deliverryopt;
  deliveryoption.forEach((opt)=>
  {
    if(opt.id===deliveryOptid)
    {
      deliverryopt=opt;
    }
  });
  let temp=deliverryopt;
  console.log(temp.id
  );
  
  const today = dayjs();
    const deliverydate = today.add(temp.deliverydate, 'days');
    const datestring = deliverydate.format('ddd, MMM D');


  cartsummery +=
    `<div class="cart-item-container js-cart-${matchingpro.id}">
      <div class="delivery-date">
        Delivery date:${datestring}
      </div>
      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingpro.image}">
        <div class="cart-item-details">
          <div class="product-name">
            ${matchingpro.name}
          </div>
          <div class="product-price">
            $${(matchingpro.priceCents / 100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartitem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary delete-link" data-product-id="${matchingpro.id}">
              Delete
            </span>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryHTML(matchingpro,cartitem)}
        </div>
      </div>
    </div>`;
});

function deliveryHTML(matchingpro,cartitem) {
  let html = '';
  deliveryoption.forEach((deli) => {
    const today = dayjs();
    const deliverydate = today.add(deli.deliverydate, 'days');
    const datestring = deliverydate.format('ddd, MMM D');
    
    const pricest = deli.pricecents === 0 ? 'FREE' : `$${(deli.pricecents / 100).toFixed(2)} -`;
    const isChecked=deli.id===cartitem.deliveryoptionid

    html +=
      `<div class="delivery-option"
      data-product-id="${matchingpro.id}"
      data-delivery-option-id="${deli.id}">
        <input type="radio"
        ${isChecked?'checked':''} class="delivery-option-input" name="delivery-option-${matchingpro.id}">
        <div>
          <div class="delivery-option-date">
            ${datestring}
          </div>
          <div class="delivery-option-price">
            ${pricest} Shipping
          </div>
        </div>
      </div>`;
  });
  return html;
}

document.querySelector('.order-summary').innerHTML = cartsummery;
document.querySelectorAll('.delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    let productId = link.dataset.productId;
    removecart(productId);
    document.querySelector(`.js-cart-${productId}`).remove();
  });
});
document.querySelectorAll('.delivery-option').forEach((ele)=>
{
  ele.addEventListener('click',()=>{
    const {productId,deliveryOptionId}=ele.dataset;

    UpdateDelivery(productId,deliveryOptionId)
    ordersummery();
  });
});
}
