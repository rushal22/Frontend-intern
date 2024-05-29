import React,{useEffect , useState, createContext} from "react";
import axios from "axios";
import Card from "../../components/shared/cards/Card";
import Loadingpage from "../../components/shared/features/Loadingpage";
import baseApi from "../../apibase-endpoint/apiBase";
import { productEnd } from "../../apibase-endpoint/apiEndpoint";


const Home = () => {
  const [products , setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await baseApi({apiDetails: productEnd.allProduct});
     if(response.status === 200){
      setProducts(response.data.data);
      setLoading(false)
     }
     else{
      setLoading(false)
     }
    } catch (error) {
      setLoading(false)
      console.error('Error fetching products:', error);
    }
  }
  if(loading){
    return <Loadingpage />
  }
  return (
    <div className='main-content'>
    <Card data={products}/>
    </div>
  );
};

export default Home;
