import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import CatCard  from "./components/CatCard";
import AddCard from "./components/AddCard";
import cookies from "js-cookies"
import http from "./http"



export default function Home(){
 
  useEffect(()=>{
    http.GET(
      "/users/current-user"
    )
    .then((res)=>{
      console.log(res);
    })
  }, [])
  const {email} = useContext(UserContext);
  const [categories, setCategories] = useState([]);
    useEffect(()=>{   
      http.GET("/products/categories")
      .then((res)=>{
        console.log(res)
        setCategories(res);
      })
      .catch((err)=>{
        console.error(err)
      })
    }, [email])
    return (
    <>
      
        <div className="container pt-16 m-auto">
          <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
            {
            categories.map((element)=>{
                return <CatCard data={element} key={element} />
            })
            }
            <AddCard/>
        </div>
        </div>
    </>
    );
}