import { useRef, useState, useEffect } from 'react';

const DataTable = (props) => {
  const { data: { headers = [], body = [] } = {} } = props;
  const tableRef = useRef();

  const [dynamicTableHeight, setTableHeight] = useState(null);

  useEffect(() => {
    const tableOffset = tableRef.current.offsetTop;
    setTableHeight(`calc(100vh - ${tableOffset + 35}px)`);
  }, []);

  return (
    <>
      <div className="table-wrapper">
        <table ref={tableRef}>
          <thead>
            <tr>
              {headers.map((data) => (
                <th>{data}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((data) => (
              <tr>
                {Object.keys(data).map((d) => (
                  <td>{typeof data[d] != 'object' && data[d]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>
        {`
          .table-wrapper {
            overflow: hidden;
            border: 2px solid #ddd;
          }
          table {
            background: #fff;
            width: 100%;
            border-collapse: collapse;
            height: ${dynamicTableHeight || 'auto'};
            display: block;
            overflow: scroll;
            thead {
              padding: 20px;
              border: 1px solid #ccc;
              tr {
                border-top: 1px solid #eee;
              }
              th {
                text-align: left;
                padding: 15px 10px;
                border-right: 1px solid #eee;
                position: sticky;
                top: -1px;
                background: #fff;
              }
              th:last-child {
                width: 100%;
              }
            }
            tbody {
              border: 1px solid #ccc;
              tr {
                border-bottom: 1px solid #ccc;
                padding: 10px;
                background: #fff;
              }
              td {
                white-space: nowrap;
                padding: 15px 10px;
                border-right: 1px solid #eee;
                text-align: left;
              }
            }
          }
        `}
      </style>
    </>
  );
};

export default DataTable;
