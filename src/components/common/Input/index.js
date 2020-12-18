import './styles.scss';

const Input = ({
      id,
      labelText,
      type,
      placeholder,
      name,
      value,
      onChange,
      error
    }) => {
    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <input
          id={id}
          type={type}
          className="form-control"
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
  