import React from 'react';

import AdminCrudModule from '@/modules/AdminCrudModule';
import AdminForm from '@/forms/AdminForm';

export default function Admin() {
  const entity = 'admin';
  const searchConfig = {
    displayLabels: ['Nom', 'Prénom'],
    searchFields: 'email,name,surname',
    outputValue: '_id'
  };
  const panelTitle = 'Panneau des administrateurs';
  const dataTableTitle = 'Liste des administrateurs';
  const entityDisplayLabels = ['email'];
  const readColumns = [
    { title: 'Nom', dataIndex: 'name' },
    { title: 'Nom de famille', dataIndex: 'surname' },
    { title: 'E-mail', dataIndex: 'email' }
  ];

  const dataTableColumns = [
    { title: 'Nom', dataIndex: 'name' },
    { title: 'Nom de famille', dataIndex: 'surname' },
    { title: 'E-mail', dataIndex: 'email' }
  ];
  const ADD_NEW_ENTITY = 'Ajouter un nouvel administrateur';
  const DATATABLE_TITLE = 'Admins List';
  const ENTITY_NAME = 'admin';
  const CREATE_ENTITY = 'Create admin';
  const UPDATE_ENTITY = 'Update admin';

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
    <AdminCrudModule
      createForm={<AdminForm />}
      updateForm={<AdminForm isUpdateForm={true} />}
      config={config}
    />
  );
}
