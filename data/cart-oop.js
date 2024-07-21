const cart={
  cartItems:undefined,
  loadfromStorage(){
    this.cartItems=JSON.parse(localStorage.getItem('cart-oop'))
if(!this.cartItems){
  this.cartItems=[{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:1,
    deliveryoptionid:'1'
   },{
     productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
     quantity:1,
      deliveryoptionid:'2'
   }];
  
}

  },
 saveTo()
 {
  localStorage.setItem('cart-oop',JSON.stringify(this.cartItems));
 },
 addtocart(productId){
  let matching;
   this.cartItems.forEach((iteam)=>
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
      this.cartItems .push({
        productId:productId,
        quantity:1,
         deliveryoptionid:'1'
       });
      
      
    }
    this.saveTo();
    

},
 removecart(productId)
 {
  let newcart=[];
  this.cart.forEach((cartitem)=>{
    if(cartitem.productId!=productId)
      {
        newcart.push(cartitem);
      }
  });
  this.cart=newcart;
  this.saveTo();
 },
  UpdateDelivery(productId,deliveryoptionid){
  let matching;
  this.cartItems.forEach((iteam)=>
 {
   if(productId===iteam.productId)
     {
       matching=iteam;
     }
 });
 matching.deliveryoptionid=deliveryoptionid;
 this.saveTo();
 }
};
cart.loadfromStorage();

console.log(cart);



 
 
 


 