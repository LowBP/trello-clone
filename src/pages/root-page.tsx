import { Outlet } from 'react-router-dom';
import './css/root-page.css'
export default function MainPage() {

  return (
    <div className="root-wrapper">
      <div className='layout-wrapper'>
        <Outlet />
      </div>
    </div>
  );
}