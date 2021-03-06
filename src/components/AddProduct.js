import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


import UserService from "../services/user.service";
import AuthService from '../services/auth.service';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const nonzero = (value) => {
    if (value==0) {
      return (
        <div className="alert alert-danger" role="alert">
          Zero not acceptable!
        </div>
      );
    }
  };

const AddProduct = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [pname, setPname] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [catogory, setCatogory] = useState("");
  //const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  

  

  const handleAdd = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      UserService.addProduct(pname, price,quantity,catogory).then(
        () => {
          props.history.push("/dashboard");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  const user = AuthService.getCurrentUser()

  return (
    <div className="col-md-12">
        {user && 
        <React.Fragment>
      <img src="/dns_logo.png" alt="image"  className='loginlogo'/>
      <div className="card card-container">
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}
        <h1 className='logintitle'>Add Product</h1>

        <Form onSubmit={handleAdd} ref={form}>
          <div className="form-group username">
            <Input
              type="text"
              className="form-control inputstyle"
              name="pname"
              value={pname}
              onChange={e=>setPname(e.target.value)}
              validations={[required]}
              placeholder='Name'
            />
          </div>

          <div className="form-group username">
            <Input
              type="number"
              className="form-control inputstyle"
              name="price"
              value={price}
              onChange={e=>setPrice(e.target.value)}
              validations={[nonzero]}
              placeholder='Price'
            />
          </div>

          <div className="form-group username">
            <Input
              type="number"
              className="form-control inputstyle"
              name="quantity"
              value={quantity}
              onChange={e=>setQuantity(e.target.value)}
              validations={[nonzero]}
              placeholder='Quantity'
            />
          </div>

          <div className="form-group username">
            <select
              type="number"
              className="form-control inputstyle"
              name="quantity"
              value={catogory}
              onChange={e=>setCatogory(e.target.value)}
              validations={[required]}
              placeholder='Quantity'
              required
            >
                <option value='' disabled>Catogory</option>
                <option value='electronics'>Electronics</option>
                <option value='homeappliances'>Home Appliances</option>
                <option value='fruits'>Fruits</option>
                <option value='vegitables'>Vegitables</option>
            </select>
          </div>

          <div className="form-group username">
            <button className="btn  btn-block loginbutton" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Add</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
      </React.Fragment>
      }
    </div>
  );
};

export default AddProduct;
