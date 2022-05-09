import React from 'react';

import CrudModule from '@/modules/CrudModuleClient';
import CustomerForm from '@/forms/CustomerForm';

function Customer() {
  const entity = 'client';
  const searchConfig = {
    displayLabels: ['société', 'Nom de famille', 'Nom'],
    searchFields: 'company,surname,name',
    outputValue: '_id'
  };

  const panelTitle = "Panneau de l'utilisateurs";
  const dataTableTitle = 'Listes des utilisateurs';
  const entityDisplayLabels = ['company'];

  const readColumns = [
    {
      title: "",
      dataIndex: "url",
      render: (value) => {
        return <img src={value} style={{ width: 120, height: 120 ,borderRadius : 60 }} />
      },
    }, {
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
      title: 'Téléphone',
      dataIndex: 'phone'
    },
    {
      title: 'Addresse',
      dataIndex: 'address'
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
      title: 'Prénom',
      dataIndex: 'surname'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Addresse',
      dataIndex: 'address'
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
