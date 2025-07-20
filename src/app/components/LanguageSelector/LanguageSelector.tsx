import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';

const { Option } = Select;

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem('language', value);
  };

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      style={{ minWidth: 120 }}
      suffixIcon={<GlobalOutlined />}
    >
      <Option value="th">ไทย</Option>
      <Option value="en">English</Option>
    </Select>
  );
};

export default LanguageSelector;