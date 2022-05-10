import React from 'react';

import CustomCrudModule from '@/modules/CustomCrudModule';
import CustomerForm from '@/forms/CustomerForm';
import NavigationListener from '@/components/NavigationListener';

function SelectCustomer() {
  const entity = 'client';
  const searchConfig = {
    displayLabels: ['company', 'surname', 'name'],
    searchFields: 'company,surname,name',
    outputValue: '_id'
  };

  const panelTitle = 'Utilisateurs+ Panel';
  const dataTableTitle = 'Utilisateurs+';
  const entityDisplayLabels = ['company'];

  const readColumns = [
    {
      title: 'Company',
      dataIndex: 'company'
    },
    {
      title: 'Manager Surname',
      dataIndex: 'surname'
    },
    {
      title: 'Manager Name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Téléphone',
      dataIndex: 'phone'
    }
  ];
  const dataTableColumns = [
    {
      title: 'Titre',
      dataIndex: 'company'
    },
    {
      title: 'Prénom manager',
      dataIndex: 'surname'
    },
    {
      title: 'Nom manager',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    }
  ];

  const ADD_NEW_ENTITY = 'Ajouter';
  const DATATABLE_TITLE = 'Liste';
  const ENTITY_NAME = 'Utilisateur+';
  const CREATE_ENTITY = 'Ajouter Utilisateur+';
  const UPDATE_ENTITY = 'Ajouter Utilisateur+';
  const config = {
    entity,
    panelTitle,
    dataTableTitle,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels
  };
  return (
    <>
    <NavigationListener  location={location} />
    <CustomCrudModule
      createForm={<CustomerForm />}
      updateForm={<CustomerForm isUpdateForm={true} />}
      config={config}
    />
    </>
  );
}

export default SelectCustomer;
