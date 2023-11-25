import {  useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import ProdCard  from "./components/prodCard";
import { Link } from 'react-router-dom';
import Login from "./Login"
import http from './http';


export default function Product(){
    const params = useParams();
    const [category, setCategory] = useState(params.category);
    const {email, id, setId, setEmail} = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(()=>{
      http.GET(`/products/categories/${category}`)
      .then((res)=>{
        setProducts(res);
      })
      .catch((err)=>{
        console.error(err)
      })
    }, [])
    if(!email){
      return(
        <Login />
    )
    }
    return (
        <>
        <div className="container pt-16 m-auto">
          <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
            {
              products.map((element)=>{
                  return <ProdCard data={element} key={element._id} />
              })
            }
        </div>
        </div>
    </>
    )
}
