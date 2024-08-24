import { useEffect, useState } from "react";
import { SignUpStyles } from "./style";
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

function SignUp({ showToastMessage }) {
  const intialFormData = {
    name: "",
    dob: "",
    email: "",
    gender: "male",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(intialFormData);

  useEffect(() => {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  useEffect(() => {
    if (formData.confirmPassword !== "") {
      if (formData.password !== formData.confirmPassword) {
        document
          .getElementById("confirmPassword")
          ?.classList.add("error_field");
        document
          .getElementById("confirmPassword")
          ?.classList.remove("feild_matched");
      } else {
        document
          .getElementById("confirmPassword")
          ?.classList.remove("error_field");
        document
          .getElementById("confirmPassword")
          ?.classList.add("feild_matched");
      }
    }
  }, [formData]);

  const validateFormData = (showMessage = false) => {
    let errorMessage = "";
    let errorField = "";
    let { name, dob, email, password, confirmPassword } = formData;
    name = name.trim();
    dob = dob.trim();
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    if (name === "" || !validateName(name)) {
      if (name === "") {
        errorMessage = "Name is required";
      } else if (!validateName(name)) {
        errorMessage = "Only alphabets are allowed in name";
      }
      errorField = "name";
    } else if (dob === "") {
      errorMessage = "DOB is required";
      errorField = "dob";
    } else if (email === "" || !validateEmail(email)) {
      if (email === "") {
        errorMessage = "Email is required";
      } else if (!validateEmail(email)) {
        errorMessage = "Please  enter a valid email";
      }
      errorField = "email";
    } else if (password === "" || !validatePassword(password)) {
      if (password === "") {
        errorMessage = "Password is required";
      } else if (!validatePassword(password)) {
        errorMessage = "Please enter a valid password";
      }
      errorField = "password";
    } else {
      if (confirmPassword === "") {
        errorMessage = "Confirm password is required";
      } else if (password !== confirmPassword) {
        errorMessage = "Password and confirm password do not match";
      }
      errorField = "confirmPassword";
    }
    if (showMessage && errorMessage !== "") {
      showToastMessage(errorMessage, "error");
    }
    document.querySelector(".error_field")?.classList.remove("error_field");
    document.getElementById(errorField)?.classList.add("error_field");
    return errorMessage === "";
  };

  const validateName = (name) => {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression for validating a strong password
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Test the password against the regular expression
    return passwordPattern.test(password);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    // Calculate the difference in years
    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust the age if the birth date hasn't occurred yet this year
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <SignUpStyles>
      <div className="form-section">
        <div className="form-element" id="name">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="form-element" id="dob">
          <label htmlFor="age">DOB</label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) =>
              setFormData({
                ...formData,
                dob: e.target.value,
              })
            }
            required
          />
        </div>
      </div>
      <div className="form-section">
        <div className="form-element" id="gender">
          <label htmlFor="gender">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({
                ...formData,
                gender: e.target.value,
              })
            }
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">choose not to disclose</option>
          </select>
        </div>
        <div className="form-element" id="email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            required
          />
        </div>
      </div>
      <div className="form-section">
        <div className="form-element" id="password">
          <label
            htmlFor="password"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="1. Minimum 8 characters. 
                   2. At least one uppercase letter. 
3. At least one lowercase letter. 
4. At least one number.
5. At least one special character (e.g., @, #, $, etc.)."
          >
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="form-element" id="confirmPassword">
          <label htmlFor="confirm_password">Confirm password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
            required
          />
        </div>
      </div>
      <div className="form-section">
        <div className="form-element">
          <button
            type="button"
            id="submit-new-user"
            className="btn btn-primary"
            onClick={() => {
              if (validateFormData(true)) {
                let formData_ = {
                  ...formData,
                  age: calculateAge(formData.dob),
                };
                delete formData_["dob"];
                delete formData_["confirmPassword"];
                axios
                  .post(
                    "http://localhost:5000/private/users/create-user",
                    formData_
                  )
                  .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                      if (
                        res.data.status === 0 &&
                        typeof res.data.message === "string"
                      ) {
                        showToastMessage(res.data.message, "error");
                      } else {
                        showToastMessage("User created successfully");
                        setFormData(intialFormData);
                      }
                    } else {
                      console.log("Some error occured!");
                    }
                  })
                  .catch((err) => console.log(err));
              }
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </SignUpStyles>
  );
}

export default SignUp;
