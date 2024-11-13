import * as yup from "yup"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useDispatch } from "react-redux";
import { userLogin } from "../../../redux/Slices/AuthSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(localStorage.getItem("login"))
  console.log(localStorage.getItem("login") == "true")
  console.log(typeof localStorage.getItem("login"))
  console.log(typeof localStorage)
  useEffect(() => {
    if (localStorage.getItem("login") == "true") {
      console.log("::")
      navigate("/manage/venues");
    }
  }, [])
  let userSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required")
  });

  const handleSubmit = (values) => {
    console.log(values);
    dispatch(userLogin(values))?.unwrap().then(res => {
      console.log(res, res?.status)
      if (res?.status) {
        console.log("object")
        toast.info("Sucessfully Login")
        localStorage.setItem("login", true)
        navigate('/manage/venues')
      } else {
        console.log("object", res?.message)
        toast.error(res?.message)
      }
    }).catch(err => toast.error(err))
  }

  return (<Formik initialValues={{ email: "", password: "" }}
    onSubmit={handleSubmit}
    validationSchema={userSchema}>
    <Form >
      <Field type="email" name="email" />
      <ErrorMessage name="email" />
      <Field type="password" name="password" />
      <ErrorMessage name="password" />
      <button type="submit">Login</button>
    </Form>
  </Formik>);
}

export default SignUp;
