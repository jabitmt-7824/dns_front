import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://13.235.16.177:8000/";


const addProduct=(pname,price,quantity,catogory) =>{
  return axios({
    method: 'post',
    url: API_URL+'product/add',
    headers:authHeader(),
    data: {
      'name': pname,
      'price': price,
      'quantity':quantity,
      'category':catogory
    }
  });
};

const latestProduct=() =>{
  return axios({
    method: 'get',
    url: API_URL+'product/view-latest',
    headers:authHeader(),
    data: {
    }
  });
}

const AllProducts=() =>{
  return axios({
    method: 'get',
    url: API_URL+'product/view',
    headers:authHeader(),
    data: {
    }
  });
}


const DeleteProduct=(id) =>{
  return axios({
    method: 'delete',
    url: API_URL+'product/delete/'+id,
    headers:authHeader(),
    data: {
    }
  });
}


const editProduct=(price,quantity,id) =>{
  return axios({
    method: 'post',
    url: API_URL+'product/update/'+id,
    headers:authHeader(),
    data: {
      'price': price,
      'quantity':quantity
    }
  });
};






export default {
  addProduct,
  AllProducts,
  latestProduct,
  DeleteProduct,
  editProduct
};
