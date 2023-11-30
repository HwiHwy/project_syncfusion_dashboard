import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import { Button } from '@syncfusion/ej2/buttons';

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: false };
  const toolbarOptions = ['Add', 'Edit', 'Delete'];
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      headerText: 'Total Price',
      textAlign: 'center',
      editType: 'numericedit',
      width: '150',
      template: (props) => (
        <div>
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(props.totalPrice)}
          {' VND'}
        </div>
      ),
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
      field: 'details',
      headerText: 'Details',
      width: '150',
      textAlign: 'Center',
      template: (props) => (
        <button
          style={{
            padding: '10px',
            color: 'white',
            backgroundColor: 'blue',
            borderRadius: '5px',
          }}
          onClick={() => handleDetails(props)}
        >
          View Details
        </button>
      ),
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
      headerText: 'Total Price',
      textAlign: 'center',
      editType: 'numericedit',
      width: '150',
      template: (props) => (
        <div>
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(props.totalPrice)}
          {' VND'}
        </div>
      ),
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
      field: 'details',
      headerText: 'Details',
      width: '150',
      textAlign: 'Center',
      template: (props) => (
        <button
          style={{
            padding: '10px',
            color: 'white',
            backgroundColor: 'blue',
            borderRadius: '5px',
          }}
          onClick={() => handleDetails(props)}
        >
          View Details
        </button>
      ),
    },
  ];

  const itemsData = [
    { id: 1, item: 'Quần áo', price: 15000 },
    { id: 2, item: 'Mùng, drap, bao gối', price: 40000 },
    { id: 3, item: 'Chăn bông', price: 40000 },
    { id: 4, item: 'Gối', price: 100000 },
    { id: 5, item: 'Chăn hè', price: 25000 },
    { id: 6, item: 'Màng, rèm cửa', price: 30000 },
    { id: 7, item: 'Áo da', price: 70000 },
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

  const handleDetails = (props) => {
    setSelectedOrder(props);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalVisible(false);
  };
  console.log('====================================');
  console.log(selectedOrder);
  console.log('====================================');

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
      {isModalVisible && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* You can put an icon here */}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Order Details - {selectedOrder.id}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Customer Name: {selectedOrder.CustomerName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total Price: {selectedOrder.totalPrice}
                      </p>
                      
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-900">
                          Details:
                        </p>
                        {selectedOrder.details.map((detail, index) => (
                          <div key={index} className="text-sm text-gray-500">
                            <p>Order ID: {detail.orderId}</p>
                            <p>Item ID: {detail.itemId}</p>
                            <p>Quantity: {detail.quantity}</p>
                            <p>unitPrice: {detail.unitPrice}</p>

                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>



  );
};

export default Orders;