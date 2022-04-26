import React, { useRef, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Item from 'antd/lib/list/Item';

export default function CustomerForm({ isUpdateForm = false }) {
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const { Option } = Select;

  const [profilePic, setProfilePic] = useState(null)
  const [role, setRole] = useState("user")



  let ProfileImage = ({ name, value, onUpload, onChange }) => {
    const ref = useRef()
    const uploadImg = (e) => {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "ywtxhaze");
      data.append("cloud_name", "dh8bgpvun");
      fetch("https://api.cloudinary.com/v1_1/dh8bgpvun/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then(async (data) => {
          onChange(data.url)
          onUpload(data.url)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return <>
      <Input
        type="file"
        id="file-input"
        onChange={uploadImg}
        style={{ display: "none" }}
        ref={ref}
      />
      <img style={{
        width: 80, height: 80,
        borderRadius: 40, cursor: "pointer"
      }}
        src={value || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&usqp=CAU"}
        alt="Profile picture"
        onClick={() => console.log(ref.current.input.click())}
      />
    </>
  }


  return (
    <>
      <Form.Item
        label="Profile picture"
        name="url"
      >
        <ProfileImage
          onUpload={(url) => setProfilePic(url)}
        />
      </Form.Item>
      <Form.Item
        label="Role"
        name="role"
        rules={[
          {
            required: true,
            message: 'Choisir role !'
          }
        ]}
      >
        <Select
          defaultValue="user"
          style={{ width: 120 }}
          onChange={(v) => setRole(v)}
        >
          <Option value="dj">dj</Option>
          <Option value="artist">Artist</Option>
          <Option value="maison">maison</Option>
          <Option value="manager" >manager</Option>
          <Option value="sponsor" >sponsor</Option>
          <Option value="studio" >studio</Option>
          <Option value="photographer" >photographer</Option>
          <Option value="son" >ingenieur de son</Option>
          <Option value="directeur artistique" >directeur</Option>
          <Option value="media" >media</Option>
          <Option value="camera man" >camera man</Option>
          <Option value="styliste" >styliste</Option>
          <Option value="beatmaker" >beatmaker</Option>
          <Option value="clipeur" >clipeur</Option>
          <Option value="salle" >salle</Option>
          <Option value="admin" disabled>admin</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Prénom"
        name="surname"
        rules={[
          {
            required: true,
            message: 'Please input your surname!'
          }
        ]}
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingRight: '5px'
        }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nom"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your manager name!'
          }
        ]}
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingLeft: '5px'
        }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Téléphone"
        rules={[
          {
            required: true,
            message: 'Please input your phone!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
          {
            required: true,
            message: 'Please input your E-mail!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mot de passe"
        type="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Addresse"
        rules={[
          {
            required: true,
            message: 'Please input your Address!'
          }
        ]}
      >
        <Input />
      </Form.Item>

    </>
  );
}
