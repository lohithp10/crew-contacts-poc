import { useState } from 'react';

const DateTimeInputBox = (props) => {
  const {
    label,
    id,
    placeholder,
    handleChange,
    pattern,
    type,
    filter = (x) => x,
    validator = (x) => x,
    value,
    disabled,
    required
  } = props;

  const [hasError, setError] = useState(false);

  const _handleChange = (e) => {
    let value = e.target.value;
    handleChange({
      id,
      value: filter(value),
      isValid: validator(value)
    });

    setError(!validator(value));
  };

  return (
    <div className="input-container">
      <label>{label}</label>
      <div className="input-wrapper">
        <input
          type={type || 'text'}
          placeholder={placeholder}
          name={id}
          onChange={_handleChange}
          value={value}
          pattern={pattern}
          disabled={disabled}
          required={required}
        />
        {/* {hasError && <span>Incorrect input</span>} */}
      </div>
      <style jsx>
        {`
          .input-container {
            margin: 10px 0;
            width: 50%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            .input-wrapper {
              display: flex;
              position: relative;
              flex-direction: column;
            }
            input {
              margin-right: 100px;
              @media screen and (max-width: 1142px) {
                margin-right: 30px;
              }
              padding: 0.375rem 0.75rem;
              font-size: 1rem;
              font-weight: 400;
              line-height: 1.5;
              color: #212529;
              background-color: #fff;
              background-clip: padding-box;
              border: 1px solid #ced4da;
              -webkit-appearance: none;
              appearance: none;
              border-radius: 0.25rem;
              transition: border-color 0.15s ease-in-out,
                box-shadow 0.15s ease-in-out;
            }
            input:disabled {
              background: #ddd;
            }
            span {
              position: absolute;
              bottom: 0px;
              font-size: 12px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DateTimeInputBox;
