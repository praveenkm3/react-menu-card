import "./App.css"
import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"
import NavBar from "./components/Navbar"

let obj1={itemname:"Tea",price:10,time:5,cook:"Mike tyson"}
let obj2={itemname:"Coffee",price:15,time:10,cook:"Virat Kohli"}
let obj3={itemname:"Milk",price:5,time:5,cook:"MSD"}
let obj4={itemname:"Black Coffee",price:35,time:6,cook:"Pollard"}
let obj5={itemname:"Butter Milk",price:54,time:10,cook:"James Anderson"}
let obj6={itemname:"Mango Juice",price:9,time:45,cook:"Ben Stokes"}
let obj7={itemname:"Lemon Tea",price:7,time:13,cook:"Stain"}
let obj8={itemname:"Cold coffee",price:10,time:15,cook:"Ab Deviliers"}
let obj9={itemname:"Apple Juice",price:13,time:13,cook:"Messy"}
let obj10={itemname:"Musambi juice",price:15,time:18,cook:"Ronaldo"}
let obj11={itemname:"gooseberry juice",price:30,time:19,cook:"suhas"}
let obj12={itemname:"Ice cream",price:10,time:13,cook:"Praveen"}

const objects=[obj1,obj2,obj3,obj4,obj5,obj6,obj7,obj8,obj9,obj10,obj11,obj12];

function Recipe(props){
return(
<div className="tea">
    <Header itemname={props.item.itemname}/>
      <Content price={props.item.price} time={props.item.time} cook={props.item.cook}/>
    <Footer />
  </div>)
}



function App(){
  return(
    <>
    <NavBar/>
    
    
    <div className="model">
      {objects.map((item,index)=>{
        return <Recipe item={item} key={index}/>
      })}
    </div>
    </>
  );
}
export default App;