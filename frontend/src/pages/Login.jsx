import React from 'react';

import { Form, Input, Button, Checkbox, Layout, Row, Col, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { login } from '@/redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import logo from '../utils/logo.png';
const { Content, Footer } = Layout;

const LoginPage = () => {
  // const [error, setError] = useState();

  // const { setAdminData } = useContext(AdminContext);
  // const history = useHistory();
  const { loading: isLoading } = useSelector(selectAuth);
  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setInputs((inputs) => ({ ...inputs, [name]: value }));
  // }
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(login(values));
  };
  return (
    <>
      <Layout className="layout">
        <Row>
          <Col span={12} offset={6}>
            <Content
              style={{
                padding: '150px 0 180px',
                maxWidth: '360px',
                margin: '0 auto'
              }}
            >
              <h1>Authentification</h1>
              {/* {error && (
                <ErrorNotice
                  message={error}
                  clearError={() => setError(undefined)}
                />
              )} */}
              <Divider />
              <div className="site-layout-content">
                {' '}
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Tapez votre email !'
                      }
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="email"
                      autoComplete="off"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Veuillez saisir votre mot de passe!'
                      }
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="mot de passe"
                      autoComplete="off"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>souviens-moi</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                      Mot de passe oubliée
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      loading={isLoading}
                    >
                      Se connecter
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Content>
          </Col>
        </Row>

        <Footer style={{ textAlign: 'center' }}>
          <img src={logo} width="150" />
          Fast Dream Panel ©2022
        </Footer>
      </Layout>
    </>
  );
};

export default LoginPage;
