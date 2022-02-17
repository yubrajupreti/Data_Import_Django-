import React from "react";
import {render} from "react-dom";

import 'antd/dist/antd.css';
import { PageHeader, Button, Descriptions, Row,Col } from 'antd';
import { SearchOutlined, SoundOutlined, CustomerServiceOutlined,UserAddOutlined } from '@ant-design/icons';
import { Image,Layout } from 'antd';


import 'antd/dist/antd.css';



const Header = () =>{
    return(
        <div className = 'header'>
          <PageHeader
      ghost={false}
      title="MUSIC"
      
      extra={[
        
        <Button key="1">Logout</Button>,
        <SearchOutlined />,
        <UserAddOutlined />
      ]}
      
    >
      
    </PageHeader>
    
        </div>
    )

}

export default Header;