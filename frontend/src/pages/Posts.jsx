import React from 'react';

import PostCrudModule from '@/modules/PostCrudModule';
import PostForm from '@/forms/PostForm';

export default function Post() {
  const entity = 'admin';
  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'email,name,surname',
    outputValue: '_id'
  };
  const panelTitle = 'Posts Panel';
  const dataTableTitle = 'Post Lists';
  const entityDisplayLabels = ['email'];
  const readColumns = [
    { title: 'Titre', dataIndex: 'title' },
    { title: 'Description', dataIndex: 'body' },
    { title: 'Audio', dataIndex: 'url' },
    { title: 'Posté par', dataIndex: 'postedBy' },
    { title: 'Nombre de vus', dataIndex: 'vue' },
    { title: 'Commentaires', dataIndex: 'comments' }
  ];

  const dataTableColumns = [
    { title: 'Titre', dataIndex: 'title' },
    { title: 'Description', dataIndex: 'body' },
    { title: 'Posté par', dataIndex: 'postedBy' },
    { title: 'Nombre de vus', dataIndex: 'vue' },
    { title: 'Commentaires', dataIndex: 'comments' }
  ];
  const ADD_NEW_ENTITY = 'Ajouter un nouvel administrateur';
  const DATATABLE_TITLE = 'Posts List';
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
    <PostCrudModule
      createForm={<PostForm />}
      updateForm={<PostForm isUpdateForm={true} />}
      config={config}
    />
  );
}
