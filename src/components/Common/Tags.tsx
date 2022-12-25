import React from 'react';
import { X, Plus } from 'react-feather';
import { ILabel } from '../../interfaces/trello';
interface ChipProps {
  item: ILabel;
  removeLabel?: (label: ILabel) => void;
  addLabel?: (label: ILabel) => void;
}
export default function Tags(props: ChipProps) {
  const { item, removeLabel, addLabel } = props;
  return (
    <label style={{ backgroundColor: item.color, color: '#fff' }}>
      {item.text}
      {removeLabel && <X onClick={() => removeLabel(item)} />}
      {addLabel && <Plus onClick={() => addLabel(item)} />}
    </label>
  );
}
