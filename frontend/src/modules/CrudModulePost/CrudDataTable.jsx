import React from 'react';

import { Button, Menu } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  FireOutlined,
  FireFilled,
  CloseSquareOutlined,
  CheckSquareOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectItemById } from '@/redux/crud/selectors';
import { useCrudContext } from '@/context/crud';
import uniqueId from '@/utils/uinqueId';
import DataTable from '@/components/DataTable';

function DropDownRowMenu({ row }) {
  const dispatch = useDispatch();
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, modal, readBox, editBox } = crudContextAction;
  const item = useSelector(selectItemById(row._id));
  const Show = () => {
    dispatch(crud.currentItem(item));
    panel.open();
    collapsedBox.open();
    readBox.open();
  };
  function Edit() {
    dispatch(crud.currentAction('update', item));
    editBox.open();
    panel.open();
    collapsedBox.open();
  }
  function ToggleFeatured() {
    dispatch(
      crud.update('post', item._id, {
        ...item,
        featured: !item.featured
      })
    );
  }
  function ToggleEnabled() {
    dispatch(
      crud.update('post', item._id, {
        ...item,
        enabled: !item.enabled
      })
    );
  }
  function Delete() {
    dispatch(crud.currentAction('delete', item));
    modal.open();
  }
  return (
    <Menu style={{ width: 130 }}>
      {/* <Menu.Item key={`${uniqueId()}`} icon={<EyeOutlined />} onClick={Show}>
        Show
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<EditOutlined />} onClick={Edit}>
        Modifier
      </Menu.Item>
      <Menu.Item
        key={`${uniqueId()}`}
        icon={
          item.enabled ? <CloseSquareOutlined /> : <CheckSquareOutlined />
        } onClick={ToggleEnabled}>
        Bascule activée
      </Menu.Item> */}
      <Menu.Item
        key={`${uniqueId()}`}
        icon={item.featured ? <FireOutlined /> : <FireFilled />}
        onClick={ToggleFeatured}
      >
        {item.featured ? 'En vedette' : 'Pas en vedette'}
      </Menu.Item>
      <Menu.Item
        key={`${uniqueId()}`}
        icon={<DeleteOutlined />}
        onClick={Delete}
      >
        Delete
      </Menu.Item>
    </Menu>
  );
}

export default function CrudDataTable({ config }) {
  return <DataTable config={config} DropDownRowMenu={DropDownRowMenu} />;
}
