import Button from '../UI/Button/Button';
import './Sidebar.css'
import { Plus } from 'react-feather';
import BoardList from '../MyBoardList/MyBoardList';
import { ISideBarProps } from '../../interfaces/trello';

function Sidebar(props: ISideBarProps) {

  return (
    <div className="sidebar">
      <div className='sidebar-wrapper'>
        <div className='sidebar-header'>
          <h2 className='sidebar-header--text'>
            My Works
          </h2>
          <div className='sidebar-header--action'>
            <Button hasIconOnly={true}><Plus /></Button>
          </div>

        </div>
        <div><BoardList {...props} /></div>
      </div>
    </div>);
}
export default Sidebar;