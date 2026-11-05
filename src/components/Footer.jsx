import { useState } from "react";
function Footer(){
const [count,SetCount]=useState(0);

  return(
    <div className="footer">
      <button className="btn1" onClick={()=>{SetCount(previousCount => previousCount + 1)}}>+</button>
      <span>{count}</span>
      <button className="btn2" onClick={()=>{SetCount(previousCount => Math.max(previousCount - 1, 0))}}>-</button>
    </div>
  );
}


export default Footer;