export const orders=JSON.parse(localStorage.getItem('orders'))||[];
export function addOrder(order){
  orders.unshift(order);
  save();

}
function save(){
  localStorage.setItem('orders',JSON.stringify(orders));
}