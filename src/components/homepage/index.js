import React, { useState,useEffect } from 'react';
import { Table, Radio, Divider,Button,Input,DatePicker, Upload ,Modal} from 'antd';
import { employeeDetail, employeeDetailFilter, employeeDetailPage,employeeDetailFilterDate, importFile, logoutApi } from '../../api';
import { HOMEPAGE_URL } from '../../api/constant';
import {SearchOutlined, CameraFilled, InboxOutlined} from '@ant-design/icons'

import {apiErrorHandler} from '../../errorHandling/error'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { removeCookie } from '../../Cookies';


const columns = [
  {
    title: 'Created by',
    dataIndex: 'username',
    render: (text) => <a>{text}</a>,
    filterDropdown:({setSelectedKeys, SelectedKeys,confirm,clearFilters})=>{
      return (
        <>
      <Input
       autoFocus
        placeholder="Type text here" 
        value={setSelectedKeys[0]}
        onChange={(e)=>{
          setSelectedKeys(e.target.value?[e.target.value]:[])
          // confirm({closeDropdown: false});
        }}
        onPressEnter={()=>{
          confirm();
        }}
        onBlur={()=>{
          confirm();
        }}
        >

        </Input>

        <Button 
        type='primary'
        onClick={()=>{
          confirm();
        }}
        >
          Search
        </Button>

      <Button 
        type='danger'
        onClick={()=>{
          clearFilters();
        }}
        >
          Reset
        </Button>
        </>
      );
    },
    filterIcon:()=>{
      return <SearchOutlined/>;
    },
    onFilter:(value,record)=>{
      // const data=await employeeDetailFilter(value)
      // record=data.data.results
      return record.username.toLowerCase().includes(value.toLowerCase())
    }

  },
  {
    title: 'Created on',
    dataIndex: 'created_date',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'full_name',
    render: (text) => <a>{text}</a>,
    sorter:(name1,name2)=>{
      return name1.full_name.localeCompare(name2.full_name);
    }
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dob',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    sorter:(salary1,salary2)=>{
      console.log(parseFloat(salary1.salary)>parseFloat(salary2.salary))
      return parseFloat(salary1.salary)-parseFloat(salary2.salary);
    }
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
    sorter:(position1,position2)=>{
      return position1.designation.localeCompare(position2.designation);
    }
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    
  }


];

 // rowSelection object indicates the need for row selection

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   getCheckboxProps: (record) => ({
//     disabled: record.name === 'Disabled User',
//     // Column configuration not to be checked
//     name: record.name,
//   }),
// };

const Homepage = () => {
  const imageState = {
    file: null,
  };

  const[data,setData]=useState([]);
  const [selectionType, setSelectionType] = useState();
  const [page,setPage]=useState(1)
  const[total,setTotal]=useState()
  const[searchData, setSearchData]=useState("")
  const [selectedData, setSelectedData]=useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState(imageState);


  function handleUpload(event) {
    //  window.myevent= event
    
    setImage({ ...data, file: event.file });
  }
  console.log(image);

 

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async(events) => {
    events.preventDefault();
    console.log(image)
    let formData = new FormData();
    formData.append(
      "file",
      image.file,
      image.file.name
    );
    await importFile(formData)
    .then(response=>{
      console.log(response)
      window.location.reload();

    })
    
    .catch(err=>{
      const errMsg = apiErrorHandler(err)
        toast.error(errMsg)
    })
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  const rowSelection = {
    // selectedRowKeys,
    onChange: (selectedRowKeys,data) => {
      setSelectedData(data)
      

    },
    
    
  };

  const logoutHandle = async () => {
    const response = await logoutApi();
    removeCookie("token");
    window.location.href = "/";
  };

  const onChangeHandle = (event) => {
    console.log(event)
    setSearchData(event.target.value );
  };

  // const onDateChangeHandle = (selected) => {
  //   console.log(selected)
  //   setSearch(selected );
  // };


  const handleUserSearch = async () => {
    console.log(searchData)
    await employeeDetailFilter(searchData)
    .then(response => {
      setData(response.data.results)
      })
      .catch(err=>{
        const errMsg = apiErrorHandler(err)
        toast.error(errMsg)
  
      }
        )
    
    
  };
  const handleDateSearch = async () => {
    console.log(searchData)
    await employeeDetailFilterDate(searchData)
    .then(response => {
      setData(response.data.results)
      })
    .catch(err=>{
      const errMsg = apiErrorHandler(err)
      toast.error(errMsg)

    }
      )
    
    
  };

  useEffect(async() => {
    await employeeDetail()
    .then(data =>{
      setData(data.data.results)
      setTotal(data.data.count)
      console.log(data.data.count)
    })
    .catch(err=>{
      const errMsg = apiErrorHandler(err)
      toast.error(errMsg)

    }
      )
  }, [])
  return (
    <>
    <div>
      
      <div className='user_action'>
      <div className='import'>
        
        <Button type="primary" htmlType="submit" onClick={showModal}  >
          Import
        </Button>

        <Button type="primary" htmlType="submit" onClick={logoutHandle}  >
          Logout
        </Button>
        

        
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Upload.Dragger
                        name="files"
                        onChange={handleUpload}
                        beforeUpload={() => false}
                      >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          Support for a single or bulk upload.
                        </p>
                      </Upload.Dragger>
      </Modal>
      
      </div>

      <div className="user">
          <input
            id="inputfld"
            type="Text"
            placeholder="search by creator "
            name="SearchBar"
            onChange={onChangeHandle}
          />
          <Button onClick={handleUserSearch} id="btnSearch">
            <SearchOutlined />
          </Button>
        </div>

        <div className="date">
          <input
            id="inputfld"
            type="Text"
            placeholder="search by created date "
            name="SearchBar"
            onChange={onChangeHandle}
          />
          {/* <DatePicker id='search_date' value={value} onChange={onChangeHandle} /> */}
          
          <Button onClick={handleDateSearch} id="btnSearch">
            <SearchOutlined />
          </Button>
        </div>
      

      </div>
      <ToastContainer />

      
      <Divider />

      <Table
      
        rowSelection={
          rowSelection
          // type: 'radio',
          // onChange:(record)=>{
          //   setSelectedData([record])
          // },
          // onSelect:(record)=>{
          //   setSelectedData(record)
          //   console.log(selectedData)
          // }

        }
        rowKey={ record => record.id}
        columns={columns}
        dataSource={data}
        pagination={{
          current:page,
          // pageSize:5,
          total:total,
          onChange:async(page)=>{
            setPage(page)
            await employeeDetailPage(page)
            .then(data=>{
              setData(data.data.results)
            })

          }

        }}
      />
    </div>
    </>
  );
};

export default Homepage