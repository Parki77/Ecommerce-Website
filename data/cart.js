export let cart=JSON.parse(localStorage.getItem('cart'))
if(!cart){
  cart=[{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:1,
    deliveryoptionid:'1'
   },{
     productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
     quantity:1,
      deliveryoptionid:'2'
   }];
  
}


 export function saveTo()
 {
  localStorage.setItem('cart',JSON.stringify(cart));
 }
 export function addtocart(productId){
  let matching;
   cart.forEach((iteam)=>
  {
    if(productId===iteam.productId)
      {
        matching=iteam;
      }
  });
  if(matching)
    {
      matching.quantity+=1;
    }
    else
    {
      cart .push({
        productId:productId,
        quantity:1,
         deliveryoptionid:'1'
       });
      
      
    }
    saveTo();
    

}
 export function removecart(productId)
 {
  let newcart=[];
  cart.forEach((cartitem)=>{
    if(cartitem.productId!=productId)
      {
        newcart.push(cartitem);
      }
  });
  cart=newcart;
  saveTo();
 }
 export function UpdateDelivery(productId,deliveryoptionid){
  let matching;
  cart.forEach((iteam)=>
 {
   if(productId===iteam.productId)
     {
       matching=iteam;
     }
 });

 matching.deliveryoptionid=deliveryoptionid;
 saveTo();
 }