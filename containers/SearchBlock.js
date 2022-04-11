import { useContext, useEffect, useState } from 'react';
import InputBox from '../components/InputBox';
import { GlobalContext } from '../contexts/global';
import SearchButton from './SearchButton';

const inputConfig = [
  {
    label: 'Flight Designator',
    id: 'flightDesignator',
    default: 'G4',
    disabled: true,
    required: true,
    forContactType: ['staff', 'crew', 'all']
  },
  {
    label: 'Flight Number',
    id: 'flightNumber',
    filter: (val) => val.replace(/[^0-9]/g, ''),
    validator: (val) => val,
    required: true,
    forContactType: ['crew', 'all']
  },
  {
    label: 'Departure Port',
    id: 'departurePort',
    filter: (val) => val.slice(0, 3).toLocaleUpperCase(),
    validator: (val) => val,
    required: true,
    forContactType: ['crew', 'all']
  },
  {
    label: 'Arrival Port',
    id: 'arrivalPort',
    filter: (val) => val.slice(0, 3).toLocaleUpperCase(),
    validator: (val) => val,
    required: true,
    forContactType: ['staff', 'crew', 'all']
  },
  {
    label: 'STD',
    id: 'std',
    formatter: (val) => {
      const datetime = new Date(val);
      const addLeadingZero = (value) => {
        let bufferVal = value + 1;
        bufferVal =
          bufferVal.toString().length < 2 ? `0${bufferVal}` : bufferVal;
        return bufferVal;
      };
      return `${addLeadingZero(datetime.getMonth())}/${addLeadingZero(
        datetime.getDate() - 1
      )}/${datetime.getFullYear()} ${addLeadingZero(
        datetime.getHours()
      )}:${addLeadingZero(datetime.getMinutes())}`;
    },
    required: true,
    type: 'datetime-local',
    forContactType: ['crew', 'all']
  }
];

const SearchBlock = (props) => {
  const [data, setData] = useState({});
  const { contactsType } = useContext(GlobalContext);

  console.log('search', contactsType);

  useEffect(() => {
    // initialize with flight designator value
    setData({
      flightDesignator: { value: 'G4', isValid: true }
    });
  }, []);

  const _handleChange = ({ id, value, isValid, formattedValue }) => {
    setData({
      ...data,
      [id]: { value, isValid, formattedValue }
    });
  };

  return (
    <>
      <div className="container">
        <div className="inputs-container">
          {inputConfig
            .filter((i) =>
              i.forContactType.find((x) => contactsType.indexOf(x) >= 0)
            )
            .map((i) => (
              <InputBox
                {...i}
                handleChange={_handleChange}
                value={i.default || data[i.id]?.value || ''}
              />
            ))}
        </div>
      </div>
      <SearchButton searchPayload={data} />
      <style jsx>
        {`
          .container {
            .inputs-container {
              width: 100%;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              border-bottom: 1px solid #ccc;
              padding: 10px 0;
            }
          }
        `}
      </style>
    </>
  );
};

export default SearchBlock;
