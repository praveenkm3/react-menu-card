import { useState, useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"
import NavBar from "./components/Navbar"
import Loading from "./components/Loading"
import Auth from "./components/Auth"

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
  const [isLoading,setIsLoading]=useState(true);
  const [authState,setAuthState]=useState(()=>{
    try {
      const storedSession=localStorage.getItem("menucard-session");
      if (!storedSession) {
        return { user:null, error:"" };
      }

      const user=JSON.parse(storedSession);
      if (!user || typeof user.name !== "string" || typeof user.email !== "string") {
        throw new Error("Saved session data is invalid. Log in again after clearing this app's local storage.");
      }

      return { user, error:"" };
    } catch (error) {
      return {
        user:null,
        error:error instanceof Error ? error.message : "Unable to read the saved session."
      };
    }
  });
  const [authMode,setAuthMode]=useState(()=>authState.user ? "home" : "login");

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setIsLoading(false);
    },800);
    return ()=>clearTimeout(timer);
  },[]);

  return(
    <>
    <NavBar
      onNavigate={mode=>{
        setAuthMode(!authState.user && mode === "home" ? "login" : mode);
      }}
      onLogout={()=>{
        try {
          localStorage.removeItem("menucard-session");
          setAuthState({ user:null, error:"" });
          setAuthMode("login");
        } catch (error) {
          setAuthState(previousState => ({
            ...previousState,
            error:error instanceof Error ? error.message : "Unable to log out."
          }));
        }
      }}
      user={authState.user}
    />
    <main className="page-container">
      {authState.error && <p className="auth-error" role="alert">{authState.error}</p>}
      {!authState.user || authMode === "login" || authMode === "register" ? (
        <Auth
          mode={authMode === "register" ? "register" : "login"}
          onAuthenticated={user => {
            setAuthState({ user, error:"" });
            setAuthMode("home");
          }}
          onModeChange={setAuthMode}
        />
      ) : (
        <>
          <h1 className="page-title">Our Menu</h1>
          <p className="page-subtitle">Freshly brewed drinks, made to order</p>
          {isLoading ? (
            <Loading label="Loading menu..."/>
          ) : (
            <div className="model">
              {objects.map((item)=>{
                return <Recipe item={item} key={item.itemname}/>
              })}
            </div>
          )}
        </>
      )}
    </main>
    </>
  );
}
export default App;