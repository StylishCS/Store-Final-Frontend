import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import {useParams, useNavigate } from 'react-router-dom';
import Login from "./Login"
import http from "./http";


export default function Add(props){
    const params = useParams();
    
    const [name,setName] = useState("");
    const [category,setCategory] = useState("");
    const [sellPrice,setSellPrice] = useState("");
    const [netPrice,setNet] = useState("");
    const [labelId,setLabelId] = useState("");
    const [stock, setStock] = useState("");
    const {email, id, setId, setEmail} = useContext(UserContext);

    const [categories, setCategories] = useState([]);

    const [selectedItem, setSelectedItem] = useState(null);
    const [customItem, setCustomItem] = useState(null);

    const [inputDisabled, setInputDisabled] = useState(false);

    const [image, setImage] = useState(null);
    const [viewImage, setViewImage] = useState(null);

    const [prod, setProd] = useState({});
    useEffect(()=>{
      http.GET(`/products/product/${params.id}`)
      .then((res)=>{
      setProd(res);
      setName(res.name);
      setSelectedItem(res.category);
      setSellPrice(res.sellPrice);
      setNet(res.netPrice);
      setLabelId(res.labelId);
      setStock(res.stock);
      setViewImage(res.image)
      //console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    }, [])


    const handleSelectChange = (e) => {
      setSelectedItem(e.target.value);
      setInputDisabled(!!e.target.value);
      setCustomItem('');
    };

    const handleInputChange = (e) => {
      setCustomItem(e.target.value);
    };

    useEffect(()=>{
      http.GET("/products/categories")
      .then((res)=>{
        setCategories(res.data);
      })
      .catch((err)=>{
        console.error(err)
      })
    }, [])
    const navigate = useNavigate()
    function handleDelete(e){
      e.preventDefault();
        http.DELETE(`/products/delete/${params.id}`)
        navigate("/");
    }
    function handleUpdate(e){
      e.preventDefault();
        http.PATCH(`/products/update/${params.id}`,{
          labelId: labelId,
          name: name,
          netPrice: netPrice,
          sellPrice: sellPrice,
          stock: stock,
        })
        navigate("/");
    }
    useEffect(() => {
      // This effect will trigger when either selectedItem or customItem changes
      // It will update the category after the state changes have been applied
      setCategory(selectedItem || customItem || '');
    }, [selectedItem, customItem]);

    if(!email){
      return(
        <Login />
    )
    }
    return (
        <>
      <div className="container pt-16 m-auto">
        <label htmlFor="categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الأقسام</label>
        <select disabled value={selectedItem || ""} onChange={handleSelectChange} id="categories" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {/* <option selected value="">اختر قسم او قم بأدخال قسم جديد</option> */}
          {
            categories.map((cat) =>{
              return <option key={cat} value={cat}>{cat}</option>
            })
          }
          <option selected value="">اخر</option>
        </select>
        <form onSubmit={handleUpdate}>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">أسم المنتج</label>
            <input value={name} onChange={e=>setName(e.target.value)} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." required/>
        </div>
        <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">القسم</label>
            <input disabled value={customItem} onChange={handleInputChange} type="text" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." />
        </div>
        <div>
            <label htmlFor="sale" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">سعر البيع</label>
            <input value={sellPrice} onChange={e=>setSellPrice(e.target.value)} type="text" id="sale" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." required/>
        </div>  
        <div>
            <label htmlFor="net" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">سعر الجمله</label>
            <input value={netPrice} onChange={e=>setNet(e.target.value)} type="text" id="net" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." required/>
        </div>
        <div>
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الكميه</label>
            <input value={stock} onChange={e=>setStock(e.target.value)} type="text" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." required/>
        </div>
        <div>
            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">كود المنتج</label>
            <input value={labelId} onChange={e=>setLabelId(e.target.value)} type="text" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." required/>
        </div>
    </div>
    
    
      <img
        src={viewImage}
        alt="Uploaded"
        className="rounded-lg object-cover"
      />
    
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    <button onClick={handleDelete} className="text-white mt-1 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">مسح المنتج</button>
  </form>
</div>


    </>
    )
}
