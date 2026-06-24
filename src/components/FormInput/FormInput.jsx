import "./FormInput.css";

const FormInput = ({ label, type = "text", name, value, onChange, placeholder, required ,padding}) => {
    return (
        <div className="div-input">
            {label && <label id="label-form" >{label}</label>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`form-input ${padding}`}
                autoComplete="off"
            />
        </div>
    );
};

export default FormInput;