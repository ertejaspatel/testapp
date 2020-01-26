import React, { Component } from "react";

// class TNRadioButton extends Component {
//   constructor(props) {
//     super(props);
//     // this.inputElement = React.createRef();
//   }

//   // onClick = e => {
//   //   this.register.current.click();
//   // };

//   render() {}
// }

function TNRadioButton({ id, name, label, value, register, errorClass }) {
  // console.log("Error Class", errorClass, errorClass ? true : false);
  return (
    <div className="form-check form-check-inline">
      <input
        id={id}
        name={name}
        type="radio"
        data-toggle="radio"
        value={value}
        style={{ marginRight: "10px" }}
        ref={register({ required: true })}
        className={errorClass ? errorClass : ""}
      />
      <label
        className={"form-check-label" + (errorClass ? " text-danger " : "")}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

export default TNRadioButton;
