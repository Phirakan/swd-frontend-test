"use client";
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider, Layout, Menu, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { store } from './store/store';
import ShapeManagement from './components/ShapeManagement/ShapeManagement';
import PersonManagement from './components/PersonManagement/PersonManagement';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import './i18n/i18n';
import './App.scss';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'shapes' | 'persons'>('shapes');
  const { t } = useTranslation();

  const menuItems = [
    {
      key: 'shapes',
      label: t('menu.shapes'),
      onClick: () => setCurrentPage('shapes')
    },
    {
      key: 'persons',
      label: t('menu.persons'),
      onClick: () => setCurrentPage('persons')
    }
  ];

  return (
    <Provider store={store}>
      <ConfigProvider>
        <Layout className="app-layout">
          <Header className="app-header">
            <div className="logo">
              <h2>{t('app.title')}</h2>
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[currentPage]}
              items={menuItems}
              className="menu"
            />
            <LanguageSelector />
          </Header>
          <Content className="app-content">
            {currentPage === 'shapes' ? <ShapeManagement /> : <PersonManagement />}
          </Content>
        </Layout>
      </ConfigProvider>
    </Provider>
  );
};

export default App;