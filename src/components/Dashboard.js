import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";


export default function Dashboard(props){

    const [search,SetSearch]=useState('');
    const [catogory,SetCatogory]=useState('');
    const [latest,Setlatest]=useState({});
    const [allProducts,SetAllProducts]=useState({});
    const [error,setError]=useState('');
    const [searchBool,SetSearchBool]=useState(false);


    const user = AuthService.getCurrentUser()

    useEffect(() => {
        

          UserService.AllProducts().then(
            (response) => {
              SetAllProducts(response.data.products);
            },
            (error) => {
              const _content =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
      
              setError(_content);
            }
          );

          UserService.latestProduct().then(
            (response) => {
              Setlatest(response.data.products);
            },
            (error) => {
              const _content =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
      
              setError(_content);
            }
          );
        }, []);

        const handleDelete=value=>{
          const new_obj={...allProducts}
          console.log(new_obj[value]._id);
          UserService.DeleteProduct(new_obj[value]._id).then(
            (response) => {
              delete new_obj[value]
              SetAllProducts(new_obj);
            },
            (error) => {
              const _content =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
      
              setError(_content);
            }
          );
        }


        const handleSearch=()=>{
          if(search){
            if(catogory){
              const new_obj={...allProducts}
              const match_catogory=Object.keys(new_obj).filter(key=>(
                new_obj[key].category==catogory
                ))
              const regex = new RegExp(search,'i')
              const match__term=match_catogory.filter(item=>(
                (new_obj[item].name).match(regex)
              ))
              const new_list={}
              match__term.map(item=>{
                new_list[item]=new_obj[item]
              })
              SetAllProducts(new_list);
              SetSearchBool(true);
            }
            else{
              alert('Please select a category');
            }
          }
          else{
            alert('Please Type a Product Name');
          }
        }

        const handleEdit=(value)=>{
          props.history.push(value);
          window.location.reload();
        }

        

        console.log(allProducts);

    return(
        <div style={{padding:'0px'}}>
            {user && 
            <React.Fragment>
                <img src="/dns_logo.png" alt="image" className='imgdashboard' />
                <h1 className='headdashboard'>Dashboard</h1>
                <Link to='/addproduct'><button style={{marginLeft:'80%',width:'250px',borderRadius:'5px',marginTop:'10px'}} >Add Product</button></Link>
                <div className='searchdiv'>
                    <input type='text' className='searchinput' value={search} onChange={e=>SetSearch(e.target.value)} placeholder='Search'/>
                    <select value={catogory} onChange={e=>SetCatogory(e.target.value)} className='catogory'>
                        <option value='' disabled>Catogory</option>
                        <option value='electronics'>Electronics</option>
                        <option value='homeappliances'>Home Appliances</option>
                        <option value='fruits'>Fruits</option>
                        <option value='vegitables'>Vegitables</option>
                    </select>
                    {!searchBool?
                    <button className='searchbutton' onClick={handleSearch}>
                       Search
                    </button>:
                    <button className='searchbutton' onClick={e=>window.location.reload()}>
                      Clear Search
                    </button>}
                    
                </div>
                <div className='tablediv'>
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                            <th scope="col">ProductName</th>
                            <th scope="col">Price</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(allProducts).map(key=>(
                            <tr>
                            <th scope="row">{allProducts[key].name}</th>
                            <td>${allProducts[key].price}</td>
                            <td><button value={`/${allProducts[key].category}/${allProducts[key].quantity}/${allProducts[key]._id}/${allProducts[key].price}/${allProducts[key].name}`} onClick={e=>handleEdit(e.target.value)}>Edit</button></td>
                            <td><button value={key} onClick={e=>handleDelete(e.target.value)}>Delete</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h1 className='latesthead'>Latest Product</h1>
                <div className='latestProduct'>
                    {Object.keys(latest).map(item=>(
                        <div className='product'>
                            <div>{latest[item].name}</div>
                            <div>${latest[item].price}</div>
                        </div>
                    ))}
                    

                </div>
            </React.Fragment>
            }
        </div>
    )
}