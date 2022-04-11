import { useContext, useEffect, useState, useMemo } from 'react';
import DataTable from '../components/DataTable';
import { GlobalContext } from '../contexts/global';
import DownloadCSV from './DownloadCSV';

const CrewContacts = (props) => {
  const { contactsData = [], contactsType } = useContext(GlobalContext);

  const [tableData, setTableData] = useState({});

  const formatHeaderString = (value) =>
    value
      .replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase())
      .trim();

  useEffect(() => {
    if (contactsData.length > 0) {
      setTableData({
        headers: Object.keys(contactsData?.[0] || {}).map(formatHeaderString),
        body: contactsData.filter(
          (c) => contactsType.indexOf(c.type.toLowerCase()) >= 0
        )
      });
    }
  }, [contactsData, contactsType]);

  console.log('list', contactsData);

  if (contactsData.length <= 0) return null;

  return (
    <>
      <div className="crew-contacts-container">
        <div className="header">
          <label>Crew Contacts</label>
          <div>
            {/* <SelectBox options={typeOptions} handleSelect={_handleSelect} /> */}
            <DownloadCSV />
          </div>
        </div>
        <DataTable data={tableData} />
      </div>
      <style jsx>{`
        .crew-contacts-container {
          width: 100%;
          border-top: 1px solid #ccc;
          padding: 20px 0;
          .header {
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            div {
              display: flex;
            }
          }
        }
      `}</style>
    </>
  );
};

export default CrewContacts;
