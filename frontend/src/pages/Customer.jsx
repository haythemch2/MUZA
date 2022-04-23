import React from 'react';

import CrudModule from '@/modules/CrudModule';
import CustomerForm from '@/forms/CustomerForm';

function Customer() {
  const entity = 'client';
  const searchConfig = {
    displayLabels: ['company', 'surname', 'name'],
    searchFields: 'company,surname,name',
    outputValue: '_id'
  };

  const panelTitle = 'Panel utilisateurs';
  const dataTableTitle = 'Listes des utilisateurs';
  const entityDisplayLabels = ['company'];

  const readColumns = [
    {
      title: 'Title',
      dataIndex: 'company'
    },
    {
      title: 'prénom',
      dataIndex: 'surname'
    },
    {
      title: 'Nom',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    }
  ];
  const dataTableColumns = [
    {
      title: 'Role',
      dataIndex: 'role'
    },
    {
      title: 'Nom',
      dataIndex: 'name'
    },
    {
      title: 'Prenom',
      dataIndex: 'surname'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    }
  ];

  const ADD_NEW_ENTITY = 'Ajouter utilisateur';
  const DATATABLE_TITLE = 'Liste des utilisateurs';
  const ENTITY_NAME = 'Utilisateur';
  const CREATE_ENTITY = 'Ajouter utilisateur';
  const UPDATE_ENTITY = 'Modifier utilisateur';
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
    <CrudModule
      createForm={<CustomerForm />}
      updateForm={<CustomerForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Customer;
