import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };
  const handleChange = ({ fileList }) => setFileList(fileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
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
          onChange={handleChange}
        >
          <Option value="artist">Artist</Option>
          <Option value="maison">maison</Option>
          <Option value="admin" disabled>
            admin
          </Option>
        </Select>
      </Form.Item>
      {/* <Form.Item
        label="Titre"
        name="company"
        rules={[
          {
            required: true,
            message: 'Please input your company name!'
          }
        ]}
      >
        <Input />
      </Form.Item> */}
      <Form.Item
        label="Prenom"
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
        label="Phone"
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
      {/* <>
        <h3>Galerie</h3>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
      <Form.Item
        name="youtube"
        label="Liens youtube"
        rules={[
          {
            required: false,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input />
      </Form.Item> */}
    </>
  );
}
