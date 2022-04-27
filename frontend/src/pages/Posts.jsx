import React from 'react';

import PostCrudModule from '@/modules/CrudModulePost';
import PostForm from '@/forms/PostForm';
import ReactAudioPlayer from 'react-audio-player';

export default function Post() {
  const entity = 'post';
  const searchConfig = {
    displayLabels: ['title'],
    searchFields: 'body',
    outputValue: '_id'
  };
  const panelTitle = 'Panneau de musique';
  const dataTableTitle = 'Liste des musiques';
  const entityDisplayLabels = ['email'];
  const readColumns = [
    { title: 'Titre', dataIndex: 'title' },
    { title: 'Description', dataIndex: 'body' },
    { title: 'Audio', dataIndex: 'url' },
    { title: 'Posté par', dataIndex: 'postedBy' },
    { title: 'Nombre de vus', dataIndex: 'vue' },
  ];
  const dataTableColumns = [
    { title: 'Titre', dataIndex: 'title' },
    { title: 'Description', dataIndex: 'body' },
    {
      title: 'Audio', dataIndex: 'url', render: (text, record, index) => {
        return <ReactAudioPlayer
          src={text}
          style={{
            width : 150,
            borderRadius : 80,
            backgroundColor :'#55FF5588'
          }}
          controls
        />
      }
    },
    { title: 'Posté par', dataIndex: 'postedBy' },
    { title: 'Nombre de vus', dataIndex: 'vue' },
  ];
  const ADD_NEW_ENTITY = 'Ajouter un nouvel administrateur';
  const DATATABLE_TITLE = 'Posts List';
  const ENTITY_NAME = 'admin';
  const CREATE_ENTITY = 'Create admin';
  const UPDATE_ENTITY = 'Update admin';
  const config = {
    hideSidePanel : true,
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