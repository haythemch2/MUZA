import React from 'react';

import CrudModule from '@/modules/CrudModuleLicense';
import CustomerForm from '@/forms/CustomerForm';
import LicenseForm from '@/forms/LicenseForm';
import { request } from '@/request';

function Customer() {
  const entity = 'license';
  const searchConfig = {
    displayLabels: ['utilisateur', 'plan', 'Date de debut', 'Date expiration'],
    searchFields: 'user,plan,startsAt,endsAt',
    outputValue: '_id'
  };

  const panelTitle = 'Panneau des Abonnements';
  const dataTableTitle = 'Listes des Abonnements';
  const entityDisplayLabels = ['user'];

  const readColumns = [
    {
      title: 'utilisateur',
      dataIndex: 'user',
      render: (value) => {
        return <span>{value}</span>
      }
    },
    {
      title: 'Plan',
      dataIndex: 'plan'
    },
    {
      title: 'Date de debut',
      dataIndex: 'startsAt'
    },
    {
      title: 'Date expiration',
      dataIndex: 'endsAt'
    }
  ];
  const dataTableColumns = [
    {
      title: 'Utilisateur',
      dataIndex: 'user'
    },
    {
      title: 'Plan',
      dataIndex: 'plan'
    },
    {
      title: 'Date de debut',
      dataIndex: 'startsAt'
    },
    {
      title: 'Date expiration',
      dataIndex: 'endsAt'
    }
  ];

  const ADD_NEW_ENTITY = 'Ajouter License';
  const DATATABLE_TITLE = 'Liste des Abonnements';
  const ENTITY_NAME = 'Abonnement';
  const CREATE_ENTITY = 'Ajouter Abonnement';
  const UPDATE_ENTITY = 'Modifier Abonnement';
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
      createForm={<LicenseForm />}
      updateForm={<LicenseForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Customer;
