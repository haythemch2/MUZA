import React, { useEffect } from 'react';
import { Form, Input, Menu, Space, Select, DatePicker, Dropdown } from 'antd';
import moment from 'moment';
import { DownOutlined } from '@ant-design/icons';
import Item from 'antd/lib/list/Item';
import { request } from '@/request';



const CustomDatePicker = ({ value, onChange, isUpdateForm }) => {
  let date = null;
  const InvalidDate = () => <DatePicker onChange={(date, dateString) => onChange(dateString)} />
  if (!value) return <InvalidDate />;
  try {
    date = new Date(value);
  } catch (e) {
    return <InvalidDate />
  }
  return <DatePicker
    defaultValue={moment(date, 'YYYY-MM-DD')}
    onChange={(date, dateString) => onChange(dateString)}
  />
}

const UserSelect = ({ users, onChange, value }) => {
  return (<Select  
    onChange={onChange}
  >
    {
      users.map(user =>
        <Option value={user._id}>{user.name}</Option>)
    }
  </Select>)

}

export default function LicenseForm({ isUpdateForm = false }) {
  const [users, setUsers] = React.useState([])
  useEffect(() => {
    if (!users.length) {
      request.list("client").then((res) => {
        setUsers(res.result)
      })
    }
  }, [users])
  // const [user ,setUsers] = React.useState([])
  return (
    <>
      {(
        <Form.Item
          label="utilisateur"
          name="user"
          rules={[
            {
              required: false
            }
          ]}
        >
          <UserSelect
            users={users}
          />
        </Form.Item>
      )}

      {/* {!isUpdateForm && (
        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input type="password" autoComplete="off" />
        </Form.Item>
      )} */}

      {isUpdateForm && (
        <Form.Item
          label="Plan"
          name="plan"
          rules={[
            {
              required: false
            }
          ]}
        >
          <Select defaultValue="1month" style={{ width: 120 }} allowClear>
            <Option value="1month">Annuelle</Option>
            <Option value="1year">Mensuelle</Option>
          </Select>
        </Form.Item>
      )}
      <Form.Item
        label="Date de debut"
        name="startsAt"
        rules={[
          {
            type: 'date',
            required: true
          }
        ]}
      >
        <CustomDatePicker isUpdateForm={isUpdateForm} autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="Date expiration"
        name="endsAt"
        rules={[
          {
            required: true
          }
        ]}
      >
        <CustomDatePicker isUpdateForm={isUpdateForm} autoComplete="off" />
      </Form.Item>
    </>
  );
}
