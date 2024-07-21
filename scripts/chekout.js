import { cart, removecart,UpdateDelivery } from '../data/cart.js';
import {products,getProduct}from '../data/products.js';
//import '../data/cart-class.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryoption ,getdeliveryOpt} from '../data/deliveryoption.js';
//import '../data/backend-prctice.js';
import {addOrder} from '../data/orders.js'

const today = dayjs();
const delivery = today.add(7, 'day');
console.log(delivery.format('dddd, MMM D'));
function ordersummery(){


let cartsummery = '';
cart.forEach((cartitem) => {
  const productId = cartitem.productId;
  let matchingpro=getProduct(productId);

  const deliveryOptid=cartitem.deliveryoptionid;
  let deliverryopt=getdeliveryOpt(deliveryOptid);
  
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
    payment();
  });
});
document.querySelectorAll('.delivery-option').forEach((ele)=>
{
  ele.addEventListener('click',()=>{
    const {productId,deliveryOptionId}=ele.dataset;

    UpdateDelivery(productId,deliveryOptionId)
    ordersummery();
    payment();
  });
});
}
ordersummery();
function payment()
{
  let productPrice=0;
  let shippingprice=0;
  cart.forEach((cartitem)=>{
   const product= getProduct(cartitem.productId);
   productPrice+= product.priceCents*cartitem. quantity;

   const deliveryopt= getdeliveryOpt(cartitem.deliveryoptionid);
  
   shippingprice+= deliveryopt.pricecents;
   //payment()
   
  //console.log('hello');
   
   
  });
 
  
  const totalbeforetax=productPrice+shippingprice;
  const tax=totalbeforetax*0.1;
  
  
  const total=totalbeforetax+tax;
  let html=`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">$${(productPrice/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingprice/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalbeforetax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(tax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(total/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`
  document.querySelector('.hello').innerHTML=html
  document.querySelector('.js-place-order').addEventListener('click', async ()=>
  {
  const response= await fetch('https://supersimplebackend.dev/orders',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        cart:cart
      })
    });
    const order= await response.json();
    addOrder(order);
    console.log(order);
    window.location.href='orders.html'
  });
 
  
  
}

payment();


