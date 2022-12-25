import { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { IApiMock, IMyBoard, IRouteParam } from '../interfaces/trello';
import './css/root-page.css'
export default function MainPage() {
  const [myBoards, setMyBoards] = useState<IMyBoard[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<number>(1);
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  let workspaceData = useLoaderData() as IApiMock[];
  const defaultBgColor= 'rgb(0, 121, 191)';
  const {workspaceId,myBoardId} = useParams() as unknown as IRouteParam;
  
  const getMyBoards = () => {
    return workspaceData.filter(w=> w.id == (workspaceId || 1))[0].myBoards;
  }

  const getSelectedMyBoard = () =>{
    return getMyBoards().find(b=> b.id == (myBoardId || 1))
  }
  
  useEffect(() => {
    try {
      setMyBoards(getMyBoards());
      const selectedMyBoard = getSelectedMyBoard();
      setBackgroundColor(selectedMyBoard?.meta.backgroundColor || defaultBgColor);
      setSelectedBoardId(selectedMyBoard?.id || 1);
    } catch (error) {
      console.error(error)
    }
  },[useParams()])

  return (
    <div className="root-wrapper" style={{backgroundColor: backgroundColor}}>
      <Header/>
      <div className='layout-wrapper'>
        <div><Sidebar myBoards={myBoards} selectedId={selectedBoardId} /></div>
        <Outlet />
      </div>
    </div>
  );
}