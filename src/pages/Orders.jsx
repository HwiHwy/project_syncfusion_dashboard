import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: true };




  const ordersGrids = [
    {
      field: 'customerId',
      headerText: 'customerId',
      width: '150',
      editType: 'dropdownedit',
      textAlign: 'Center',
    },
    {
      field: 'CustomerName',
      headerText: 'Customer Name',
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'totalPrice',
      headerText: 'totalPrice',
      format: 'C2',
      textAlign: 'Center',
      editType: 'numericedit',
      width: '150',
    },
    {
      field: 'id',
      headerText: 'Order ID',
      width: '120',
      textAlign: 'Center',
    },
    {
      field: 'status',
      headerText: 'Status',
      width: '120',
      textAlign: 'Center',
      editType: 'custom',
    },
    

    {
      field: 'address',
      headerText: 'Location',
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'orderTime',
      headerText: 'orderTime',
      width: '150',
      textAlign: 'Center',
    },
  ];



  const [ordersData, setOrdersData] = useState([]);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await fetch('https://silent257-001-site1.etempurl.com/api/Orders');
        const customersResponse = await fetch('https://silent257-001-site1.etempurl.com/api/Customers/GetAll');
        
        const ordersData = await ordersResponse.json();
        const customerData = await customersResponse.json();

        const combinedData = ordersData.map(order => ({
          ...order,
          CustomerName: getCustomerName(customerData, order.customerId),
        }));

        setCombinedData(combinedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCustomerName = (customerData, customerId) => {
    const customer = customerData.find(customer => customer.id === customerId);
    return customer ? `${customer.firstName} ${customer.lastName}` : '';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={combinedData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {ordersGrids.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
  );
};

export default Orders;