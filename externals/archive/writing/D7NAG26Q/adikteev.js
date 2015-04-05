(function(e,t){
  t=t||{};var n=document.createElement('script');
  var r='https:'==window.location.protocol?'https://':'http://';
  n.src=r+'cdn.adikteev.com/lib/v3/aksdk.moment?t='+((new Date).getTime()/1e3/3600).toFixed();
  n.type='text/javascript';n.async='true';
  n.onload=n.onreadystatechange=function(){
  if(top.AKSdk&&top.isInitAKSdk===true)return;
  var n=this.readyState;if(n&&n!='complete'&&n!='loaded')return;
  try{top.isInitAKSdk=true;top.AKSdk.init(e,t) }catch(r){}
  };
  try{ var i=top.document.getElementsByTagName('script')[0];i.parentNode.insertBefore(n,i); }catch(e){};
})({desktop:'_L9jv2JbUUrKdq6nUQSPwv8I7INgRHZQmJFHwnZ0TWM='});// JavaScript Document