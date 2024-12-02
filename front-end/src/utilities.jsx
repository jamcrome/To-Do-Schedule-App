import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

export const userRegistration = async (formData) => {
  const { email, password, registered} = formData;
  let response = await api.post(
    `users/${registered ? "signup/" : "login/"}`,
    {
      email: email,
      password: password,
    }
  );
  if (response.status === 200 || response.status === 201){
    let {token, user} = response.data
    localStorage.setItem('token', token)
    api.defaults.headers.common['Authorization'] = `Token ${token}`
    return user
  }
  alert(response.data)
  return null
};