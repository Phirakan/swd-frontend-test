import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Typography,
  message,
  Popconfirm,
  Select,
  Row,
  Col
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ColumnsType } from 'antd/es/table';
import { RootState } from '../../store/store';
import { addPerson, updatePerson, deletePerson, Person } from '../../store/personSlice';
import './PersonManagement.scss';

const { Title } = Typography;
const { Option } = Select;

const PersonManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { persons, loading } = useSelector((state: RootState) => state.persons);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const nationalityOptions = [
    'Thai', 'American', 'British', 'Japanese', 'Chinese', 
    'Korean', 'Indian', 'German', 'French'
  ];

  const genderOptions = ['Male', 'Female', 'Unisex'];

  const handleAdd = () => {
    setEditingPerson(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    form.setFieldsValue(person);
    setModalVisible(true);
  };

  const handleDelete = (personId: string) => {
    dispatch(deletePerson(personId));
    message.success(t('persons.messages.deleteSuccess'));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingPerson) {
        dispatch(updatePerson({ ...values, id: editingPerson.id }));
        message.success(t('persons.messages.editSuccess'));
      } else {
        dispatch(addPerson(values));
        message.success(t('persons.messages.addSuccess'));
      }
      
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setEditingPerson(null);
  };

  const columns: ColumnsType<Person> = [
    {
      title: t('persons.table.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Person, b: Person) => a.name.localeCompare(b.name),
      width: 120,
    },
    {
      title: t('persons.table.age'),
      dataIndex: 'age',
      key: 'age',
      sorter: (a: Person, b: Person) => a.age - b.age,
      width: 80,
    },
    {
      title: t('persons.table.gender'),
      dataIndex: 'gender',
      key: 'gender',
      width: 100,
      render: (gender: string) => t(`persons.gender.${gender?.toLowerCase()}`),
    },
    {
      title: t('persons.table.email'),
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      width: 200,
    },
    {
      title: t('persons.table.phone'),
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: t('persons.table.mobilePhone'),
      dataIndex: 'mobilePhone',
      key: 'mobilePhone',
      width: 120,
    },
    {
      title: t('persons.table.citizenId'),
      dataIndex: 'citizenId',
      key: 'citizenId',
      width: 140,
    },
    {
      title: t('persons.table.nationality'),
      dataIndex: 'nationality',
      key: 'nationality',
      width: 120,
      render: (nationality: string) => 
        nationality ? t(`persons.nationality.${nationality?.toLowerCase()}`) : '',
    },
    {
      title: t('persons.table.address'),
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
      width: 150,
    },
    {
      title: t('persons.table.actions'),
      key: 'actions',
      width: 150,
      fixed: 'right',
      render: (text: any, record: Person) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
            className="edit-btn"
          >
            {t('persons.table.edit')}
          </Button>
          <Popconfirm
            title={t('persons.confirmDelete')}
            onConfirm={() => handleDelete(record.id)}
            okText={t('common.ok')}
            cancelText={t('common.cancel')}
            okButtonProps={{ danger: true }}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              className="delete-btn"
            >
              {t('persons.table.delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="person-management">
      <Card>
        <div className="header-section">
          <Title level={2}>{t('persons.title')}</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAdd}
            className="add-btn"
          >
            {t('persons.addPerson')}
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={persons}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: persons.length,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} items`,
            pageSizeOptions: ['5', '10', '20', '50'],
          }}
          scroll={{ x: 1400 }}
          className="person-table"
        />

        <Modal
          title={editingPerson ? t('persons.editPerson') : t('persons.addPerson')}
          open={modalVisible}
          onOk={handleSubmit}
          onCancel={handleCancel}
          okText={t('common.save')}
          cancelText={t('common.cancel')}
          width={800}
          className="person-modal"
        >
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label={t('persons.form.name')}
                  rules={[{ required: true, message: t('persons.form.nameRequired') }]}
                >
                  <Input placeholder={t('persons.form.name')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="age"
                  label={t('persons.form.age')}
                  rules={[{ required: true, message: t('persons.form.ageRequired') }]}
                >
                  <InputNumber
                    min={1}
                    max={150}
                    style={{ width: '100%' }}
                    placeholder={t('persons.form.age')}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label={t('persons.form.gender')}
                  rules={[{ required: true, message: t('persons.form.genderRequired') }]}
                >
                  <Select placeholder={t('persons.form.gender')}>
                    {genderOptions.map(gender => (
                      <Option key={gender} value={gender}>
                        {t(`persons.gender.${gender.toLowerCase()}`)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="nationality"
                  label={t('persons.form.nationality')}
                >
                  <Select 
                    placeholder={t('persons.form.nationality')}
                    allowClear
                  >
                    {nationalityOptions.map(nationality => (
                      <Option key={nationality} value={nationality}>
                        {t(`persons.nationality.${nationality.toLowerCase()}`)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="citizenId"
                  label={t('persons.form.citizenId')}
                  rules={[{ required: true, message: t('persons.form.citizenIdRequired') }]}
                >
                  <Input placeholder={t('persons.form.citizenId')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label={t('persons.form.email')}
                  rules={[
                    { required: true, message: t('persons.form.emailRequired') },
                    { type: 'email', message: t('persons.form.emailInvalid') }
                  ]}
                >
                  <Input placeholder={t('persons.form.email')} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label={t('persons.form.phone')}
                  rules={[{ required: true, message: t('persons.form.phoneRequired') }]}
                >
                  <Input placeholder={t('persons.form.phone')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="mobilePhone"
                  label={t('persons.form.mobilePhone')}
                  rules={[{ required: true, message: t('persons.form.mobilePhoneRequired') }]}
                >
                  <Input placeholder={t('persons.form.mobilePhone')} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              label={t('persons.form.address')}
              rules={[{ required: true, message: t('persons.form.addressRequired') }]}
            >
              <Input.TextArea 
                rows={3} 
                placeholder={t('persons.form.address')} 
              />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default PersonManagement;