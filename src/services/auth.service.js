import axios from "axios";


const API_URL='http://13.235.16.177:8000/user/'



const login = (username, password) => {
  //console.log(username);
  return axios
    .post(API_URL + "login", {
        'name':username,
        'password':password,
    })
    .then((response) => {
      console.log(response.data.data.token);
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data.token));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  getCurrentUser,
};
