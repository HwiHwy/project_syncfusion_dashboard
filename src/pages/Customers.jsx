import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { Header } from '../components';

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: false, allowEditing: false };


  const customersGrid = [
    { type: "checkbox", width: "50" },
    {
      field: "firstName",

      headerText: "firstName",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "lastName",
      headerText: "lastName",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "address",
      headerText: "address",
      width: "130",
      format: "yMd",
      textAlign: "Center",
    },
    {
      field: "email",
      headerText: "email",
      width: "100",
      format: "C2",
      textAlign: "Center",
    },
    {
      field: "phone",
      headerText: "phone",
      width: "100",
      format: "yMd",
      textAlign: "Center",
    },

    {
      field: "orders",
      headerText: "orders",
      width: "150",
      textAlign: "Center",
      template: (props) => (
        <div>
          {Array.isArray(props.orders) &&
            props.orders.map((order) => (
              <div key={order.id}>
                <p>Order ID: {order.id}/Status: {order.status}</p>
  
                <p>Pickup Time: {order.pickUpTime}</p>
              </div>
            ))}
          {Array.isArray(props.orders) && props.orders.length > 2 && <p>...</p>}
        </div>
      ),
    },
    
    {
      headerText: 'Order Count',
      width: '100',
      textAlign: 'Center',
      template: (props) => (
        <span>{props.orders.length}</span>
      ),
    },
    {
      field: "id",
      headerText: "Customer ID",
      width: "120",
      textAlign: "Center",
      isPrimaryKey: true,
    },
  ];



  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://silent257-001-site1.etempurl.com/api/Customers/GetAll');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customers}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
