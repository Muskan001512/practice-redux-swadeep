import styled from "styled-components";

export const SignUpStyles = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 550px;
  min-height: fit-content;
  padding: 20px;
  border-radius: 15px;
  border: 2px solid red;
  .form-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .form-section:last-child {
    justify-content: center;
    margin-top: 10px;
  }
  .form-element {
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
    margin: 5px;
    gap: 5px;
    border-radius: 5px;
    width: 50%;
    label {
      cursor: pointer;
    }
    label::after {
      content: "*";
      color: red;
      margin-left: 2px;
    }
    input,
    select {
      padding: 5px;
      border: 1px solid red;
      border-radius: 5px;
      cursor: pointer;
    }
    input:focus,
    select:focus {
      outline: 2px solid red;
    }
    .btn-primary {
      background-color: transparent;
      color: red;
      border: 1px solid red;
    }
    .btn-primary:hover {
      background-color: red;
      color: white;
    }
  }
  .form-element.error_field label {
    color: red;
  }
  .form-element.feild_matched label {
    color: green;
  }
  .form-section:last-child .form-element {
    width: 100%;
    border: none;
    padding: 0;
  }
  #submit-new-user {
    width: 100%;
  }
`;
