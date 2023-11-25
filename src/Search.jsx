import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import ProdCard  from "./components/prodCard";
import { Link } from 'react-router-dom';
import Login from "./Login"
import http from "./http";


export default function Search(){
    
    const {email, id, setId, setEmail} = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [found, setFound] = useState([]);
    useEffect(()=>{
      http.GET(`/products/all`)
      .then((res)=>{
        setProducts(res.data);
      })
      .catch((err)=>{
        console.error(err)
      })
    }, [])
    function handleSearch(e){
        setSearch(e)
        let result = products.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(e.toLowerCase())
        })
        if(e !== ''){
            setFound(result);
        }
        else{
            setFound(products);
        }
    }
    if(!email){
      return(
        <Login />
    )
    }
    return (
        <>
        <form>   
          <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="أبحث عن منتج..." value={search} onChange={e=>{handleSearch(e.target.value)}} required/>
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
      </form>

        <div className="container pt-16 m-auto">
          <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
            {search.length > 1 ?
                found.map((element)=>{
                    return <ProdCard data={element} key={element._id} />
                }) : products.map((element)=>{
                    return <ProdCard data={element} key={element._id} />
                })
            }
            </div>
        </div>
    </>
    )
}
