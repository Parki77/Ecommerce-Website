export let deliveryoption=[{
  id:'1',
  deliverydate:7,
  pricecents:0
},{
  id:'2',
  deliverydate:3,
  pricecents:499
},{
  id:'3',
  deliverydate:1,
  pricecents:999
}];
export function getdeliveryOpt(deliveryOptid){
    let deliverryopt;
    deliveryoption.forEach((opt)=>
    {
      if(opt.id===deliveryOptid)
      {
        deliverryopt=opt;
      }
    });
    return deliverryopt || deliveryoption[0] ;
}