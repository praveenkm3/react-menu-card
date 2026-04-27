import { useState } from "react";
function Footer(){
const [count,SetCount]=useState(0);

  return(
    <div className="footer">
      <button className="btn1" onClick={()=>{SetCount(count+1)}}>+</button>
      <span>{count}</span>
      <button className="btn2" onClick={()=>{SetCount(count>0?count-1:count-0)}}>-</button>
    </div>
  );
}


export default Footer;