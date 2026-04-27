function Content(props){
  return(
   <div className="content">
      <ul>
        <li>Item Price : $ {props.price} </li>
        <li>Prep Time : {props.time} min</li>
        <li>Cook : {props.cook} </li>
    </ul>
   </div>
  );
}
export default Content;