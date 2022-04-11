import { useContext, useMemo } from 'react';
import { GlobalContext } from '../contexts/global';
import SelectBox from './SelectBox';

const ContactTypeSelector = (props) => {
  const typeOptions = useMemo(
    () => [
      { label: 'Staff', value: ['staff'] },
      { label: 'Crew', value: ['crew'] },
      { label: 'All', value: ['staff', 'crew'] }
    ],
    []
  );

  const { contactsType, setContactsType } = useContext(GlobalContext);

  console.log('contact type selector', typeof contactsType);

  const _handleSelect = (value) => {
    setContactsType(value);
  };

  return (
    <div className="contact-type-selector-container">
      <span>Contact Type</span>
      <SelectBox options={typeOptions} handleSelect={_handleSelect} />
      <style jsx>
        {`
          .contact-type-selector-container {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            border-bottom: 1px solid #ccc;
            padding: 10px 0;
            span {
              margin-right: 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ContactTypeSelector;
