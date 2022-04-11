import { useContext } from 'react';
import { GlobalContext } from '../contexts/global';

const DownloadCSV = (props) => {
  const { contactsData } = useContext(GlobalContext);

  const formatHeaderString = (value) =>
    value
      .replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase())
      .trim();

  const _handleClick = (e) => {
    // Get the column names by referring the object keys
    const columnNames = Object.keys(contactsData[0]);
    const formattedColumnNames = columnNames.map(formatHeaderString);

    // Convert JSON data to CSV string and encode it
    const csvData =
      'data:text/csv;charset=utf-8,' +
      [
        formattedColumnNames,
        ...contactsData.map((data) => [
          ...columnNames.map((name) => data[name])
        ])
      ]
        .map((e) => e.join(','))
        .join('\n');
    var encodedUri = encodeURI(csvData);

    // Create a dummy html link element to trigger the download action
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'crew-contacts.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <button onClick={_handleClick}>Download CSV</button>
      <style jsx>
        {`
          button {
            background-color: rgb(66, 183, 42);
            border: rgb(66, 183, 42);
            font-weight: bold;
            margin-right: 0px;
            padding: 0.375rem 0.75rem;
            line-height: 1.6em;
            color: #fff;
            margin-left: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default DownloadCSV;
