const SelectBox = (props) => {
  const { options, handleSelect } = props;

  const _handleSelect = (e) => {
    handleSelect(e.target.value);
  };

  return (
    <>
      <div className="select-container">
        <select onChange={_handleSelect}>
          {options.map((o) => (
            <option disabled={o.disabled} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <style jsx>
        {`
          .select-container {
            width: 120px;
            height: 32px;
            select {
              height: 100%;
              width: 100%;
              padding: 0;
              font-size: 1rem;
              font-weight: 400;
              line-height: 1.5;
              color: #212529;
              background-color: #fff;
              background-clip: padding-box;
              border: 1px solid #ced4da;
              border-radius: 0.25rem;
              transition: border-color 0.15s ease-in-out,
                box-shadow 0.15s ease-in-out;
            }
          }
        `}
      </style>
    </>
  );
};

export default SelectBox;
