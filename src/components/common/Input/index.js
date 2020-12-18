import './styles.scss';

const Input = ({
      id,
      labelText,
      type,
      className,
      placeholder,
      name,
      value,
      onChange,
      error
    }) => {
    return (
      <div className="form-group">
        <label htmlFor={id} className="input__label">{labelText}</label>
        <input
          id={id}
          type={type}
          className={className}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {error ? <div className="invalid-feedback">{error}</div> : null}
      </div>
    );
  };
  
  export default Input;
  