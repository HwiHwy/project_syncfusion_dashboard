import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import { Button } from '@syncfusion/ej2/buttons';

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: false };
  const toolbarOptions = ['Add', 'Edit', 'Delete'];


  const setStatus = (statusInt) => {
    switch (statusInt) {
      case 1:
        return 'Pending';
      case 2:
        return 'Approved';
      case 3:
        return 'Canceled';
      default:
        return 'Unknown';
    }
  };

  const handleApprove = (props) => {
    const { id } = props;
    console.log(id)
    const apiUrl = `https://silent257-001-site1.etempurl.com/api/Orders/UpdateStatus`;

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        status: 2,
      }),
    };

    fetch(apiUrl, requestOptions)
      .then(data => {
        console.log('API response:', data);
        window.location.reload();
      })
      .catch(error => {
        console.error('API request error:', error);
      });
  };

  const handleCancel = (props) => {
    const { id } = props;
    console.log(id)
    const apiUrl = `https://silent257-001-site1.etempurl.com/api/Orders/UpdateStatus`;

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        status: 3,
      }),
    };

    fetch(apiUrl, requestOptions)
      .then(data => {
        console.log('API response:', data);
        window.location.reload();
      })
      .catch(error => {
        console.error('API request error:', error);
      });
  };
  const orderGridWithAction = [
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

    {
      headerText: 'Action',
      width: '100',
      textAlign: 'Center',
      template: (props) => (
        <div style={{
          display: 'flex',
          gap: '20px',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <button style={{ padding: '10px', color: 'white', backgroundColor: 'green', borderRadius: '5px' }} onClick={() => handleApprove(props)}>
            Approve
          </button>
          <button style={{ padding: '10px', color: 'white', backgroundColor: 'red', borderRadius: '5px' }} onClick={() => handleCancel(props)}>
            Cancel
          </button>
        </div>
      ),
    },

  ];


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




  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  const [combinedData, setCombinedData] = useState([]);



  const pendingStuff = combinedData.filter(s => s.status === 1)
  const approvedStuff = combinedData.filter(s => s.status === 2)
  const cancelledStuff = combinedData.filter(s => s.status === 3)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await fetch('https://silent257-001-site1.etempurl.com/api/Orders');
        const customersResponse = await fetch('https://silent257-001-site1.etempurl.com/api/Customers/GetAll');

        // eslint-disable-next-line no-shadow
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


  const toolbarClick = (args) => {
    if (args.item.id === 'Grid_add') {
    } else if (args.item.id === 'Grid_edit') {
    } else if (args.item.id === 'Grid_delete') {
    }
  };
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Orders waiting for" />
        <GridComponent
          id="gridcomp"
          dataSource={pendingStuff}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
          toolbar={toolbarOptions}
          toolbarClick={toolbarClick}
        >
          <ColumnsDirective>
            {orderGridWithAction.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
        </GridComponent>

      </div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Orders approved" />
        <GridComponent
          id="gridcomp"
          dataSource={approvedStuff}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
          toolbar={toolbarOptions}
          toolbarClick={toolbarClick}
        >
          <ColumnsDirective>
            {ordersGrids.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
        </GridComponent>

      </div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Orders cancelled" />
        <GridComponent
          id="gridcomp"
          dataSource={cancelledStuff}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
          toolbar={toolbarOptions}
          toolbarClick={toolbarClick}
        >
          <ColumnsDirective>
            {ordersGrids.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
        </GridComponent>

      </div>
    </>



  );
};

export default Orders;