import {cart} from '../../data/cart'
import {getProduct} from '../../data/products'
import { deliveryoption } from '../../data/deliveryoption';
export function payment()
{
  let productPrice=0;
  
    cart.forEach((cartitem)=>{
   const product=   getProduct(cartitem.productId);
   productPrice +=product.priceCents*cartitem.quantity;
 
    });
    console.log(productPrice*10);
 
}
payment();