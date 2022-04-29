import React from 'react';
import { Form, Input, Select } from 'antd';

export default function LicenseForm({ isUpdateForm = false }) {
  return (
    <>
      {isUpdateForm && (
        <Form.Item
          label="utilisateur"
          name="user"
          rules={[
            {
              required: false
            }
          ]}
        >
          <Input readOnly autoComplete="off" />
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
          <Input readOnly autoComplete="off" />
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
        <Input autoComplete="off" />
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
        <Input autoComplete="off" />
      </Form.Item>
    </>
  );
}
