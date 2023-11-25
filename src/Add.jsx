import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import Login from "./Login"
import { Alert } from "@material-tailwind/react";
import http from "./http";

export default function Add(){
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
    
    const [showAlert, setShowAlert] = useState(false); // State to manage alert display



  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setViewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
    function logout(){
        http.POST("/users/logout").then(()=>{
            setId(null);
            setEmail(null);
        })
    }
    useEffect(() => {
      // This effect will trigger when either selectedItem or customItem changes
      // It will update the category after the state changes have been applied
      setCategory(selectedItem || customItem || '');
    }, [selectedItem, customItem]);
    function addProduct(ev){
      ev.preventDefault();
      const selectedCategory = selectedItem || customItem || '';
      if(image){
        let formData = new FormData();
        formData.append("labelId", labelId);
        formData.append("name", name);
        formData.append("category", category);
        formData.append("sellPrice", sellPrice);
        formData.append("netPrice", netPrice);
        formData.append("stock", stock);
        formData.append("image", image);
        //console.log(image)
        http.POST(`/products/add`, formData)
        .then((res)=>{
          //console.log(res)

          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false); // Hide the alert after 5 seconds
          }, 3000);
        })
        .catch((err)=>{
          console.error(err)
        })
      }
      

      else{
        console.log("flag")
        http.POST(`/products/add`, {name, category, sellPrice, netPrice, labelId, stock})
        .then((res)=>{
          //console.log(res)
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false); // Hide the alert after 5 seconds
          }, 3000);
        })
        .catch((err)=>{
          console.error(err)
        })
      }
      setName("");
      setCategory("");
      setNet("");
      setLabelId("");
      setSellPrice("");
      setStock("");
      setViewImage(null);
      setCustomItem(null);
      setSelectedItem(null);
      setImage(null);
    }
    if(!email){
      return(
        <Login />
    )
    }
    return (
        <>
        {showAlert && (
        <Alert className="fixed mt-8 top-4 left-1/2 transform -translate-x-1/2 z-20" color="green">تم اضافه المنتج بنجاح</Alert>
      )}
      <div className="container pt-16 m-auto">
        <label htmlFor="categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الأقسام</label>
        <select value={selectedItem || ""} onChange={handleSelectChange} id="categories" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {/* <option selected value="">اختر قسم او قم بأدخال قسم جديد</option> */}
          {
            categories.map((cat) =>{
              return <option key={cat} value={cat}>{cat}</option>
            })
          }
          <option selected value="">اخر</option>
        </select>
        <form onSubmit={addProduct}>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">أسم المنتج</label>
            <input value={name} onChange={e=>setName(e.target.value)} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." required/>
        </div>
        <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">القسم</label>
            <input disabled={inputDisabled} value={customItem} onChange={handleInputChange} type="text" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." />
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
    
    {
      image ? (<img
              src={viewImage}
              alt="Uploaded"
              className="w-full h-full rounded-lg object-cover"
            />):(<div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} />
        </label>
    </div> )
    }
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </form>
</div>


    </>
    )
}
