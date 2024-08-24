import SignUp from "./pages/SignUp/SignUp";
import "./public/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const showToastMessage = (message, type = "success") => {
    switch (type) {
      case "success":
        toast.success(message, {
          /* position: toast.POSITION.TOP_RIGHT, */
        });
        break;
      case "error":
        toast.error(message, {
          /* position: toast.POSITION.TOP_RIGHT, */
        });
        break;
    }
  };
  return (
    <div className="App">
      <SignUp showToastMessage={showToastMessage} />
      <ToastContainer />
    </div>
  );
}

export default App;
