import { useContext, useEffect, useMemo } from 'react';
import { GlobalContext } from '../contexts/global';
import useLazyFetch from '../hooks/useLazyFetch';

const SearchButton = (props) => {
  const { label = 'Search', isDisabled = false, searchPayload } = props;

  const { setContactsData, contactsType } = useContext(GlobalContext);

  console.log('payload', contactsType);

  const formattedQueryString = useMemo(() => {
    let buffer = {};
    Object.keys(searchPayload).map((param) => {
      buffer[param] =
        searchPayload[param]?.formattedValue || searchPayload[param]?.value;
    });
    return new URLSearchParams(buffer);
  }, [searchPayload]);

  const [data, isLoading, error, fetchContacts] = useLazyFetch({
    // url: `/staff-crew`,
    url: `/staff-crew?${formattedQueryString}${
      contactsType.split(',').length <= 1
        ? `&contactType=${contactsType.replace(/^./, (match) =>
            match.toUpperCase()
          )}`
        : ``
    }`
    // url: `/api/crew-contacts?${formattedQueryString}`
    // url: `/api/crew?flightDesignator=G4&flightNumber=343&departurePort=IDA&arrivalPort=LAX&std=06/18/2021%2004:35`
  });

  useEffect(() => {
    console.log('data', data);
    if (data) {
      // let types = ['staff', 'crew'];
      // let buffer = [...data].map((d) => ({
      //   ...d,
      //   type: types[Math.floor(Math.random() * types.length)]
      // }));
      setContactsData(data);
    }
  }, [data]);

  const _handleSubmit = (e) => {
    let areAllInputsValid =
      Object.keys(searchPayload)
        .map((x) => searchPayload[x])
        .filter((x) => !x.isValid).length <= 0;
    fetchContacts();
  };

  return (
    <>
      <button onClick={_handleSubmit} disabled={isDisabled || isLoading}>
        {isLoading ? 'fetching..' : label}
      </button>
      <span>{error?.message}</span>
      <style jsx>
        {`
          button {
            min-width: 100px;
            background-image: var(--navbar-image);
            color: var(--nav-font-color);
            display: inline-block;
            font-weight: 400;
            line-height: 1.5;
            color: #fff;
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            cursor: pointer;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-color: transparent;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            border-radius: 0.25rem;
            margin: 10px 0;
          }
          button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          span {
            margin-left: 20px;
            color: red;
          }
        `}
      </style>
    </>
  );
};

export default SearchButton;
