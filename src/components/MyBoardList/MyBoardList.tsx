import { Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import { ISideBarProps } from '../../interfaces/trello';
import Button from '../UI/Button/Button';
import './MyBoardList.css'
function BoardList(props: ISideBarProps) {
  return (<ul className='my-board-list'>
    {props.myBoards.map((item) => (
      <li className={`my-board-list-item ${item.id == props.selectedId && 'my-board-list-item-active'}`} key={item.id}>
        <Link to={`/w/1/my-boards/${item.id}`}>{item.name}</Link>
        <Button hasIconOnly={true}><Trash /></Button>
      </li>
    ))}

  </ul>);
}

export default BoardList;