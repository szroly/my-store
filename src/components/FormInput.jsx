import React from "react";

const FormInput = ({ label, name, type, defaultValue }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input
        name={name}
        type={type}
        className="input"
        defaultValue={defaultValue}
      />
    </fieldset>
  );
};

export default FormInput;
