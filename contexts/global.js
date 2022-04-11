import React, { createContext, useState } from 'react';

export const GlobalContext = createContext(null);

const GlobalProvider = (props) => {
  const { children } = props;

  const [searchData, setSearchData] = useState({});
  const [contactsData, setContactsData] = useState([]);
  const [contactsType, _setContactsType] = useState('staff');

  const setContactsType = (val) => {
    _setContactsType(val);
    setSearchData({});
    setContactsData([]);
  };

  const contextValue = {
    searchData,
    setSearchData,
    contactsData,
    setContactsData,
    contactsType,
    setContactsType
  };

  console.log('context', contactsData);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
