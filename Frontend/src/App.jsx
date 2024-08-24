import SignUp from "./pages/SignUp/SignUp";
import "../public/Global_CSS/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // const showToastMessage = (message, type = "success") => {
  //   switch (type) {
  //     case "success":
  //       toast.success(message, {
  //         /* position: toast.POSITION.TOP_RIGHT, */
  //       });
  //       break;
  //     case "error":
  //       toast.error(message, {
  //         /* position: toast.POSITION.TOP_RIGHT, */
  //       });
  //       break;
  //   }
  // };
  return (
    <div className="App">
      <SignUp />
      <ToastContainer />
    </div>
  );
}

export default App;
