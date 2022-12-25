import './Home.css'
import { useEffect, useState } from 'react';
import CustomInput from '../UI/Button/CustomInput/CustomInput';
import { ICard, IBoard, IApiMock, IRouteParam, ILabel } from '../../interfaces/trello';
import { updateLocalStorage } from '../../helpers/APILayers';
import Board from '../Board/Board';
import { useLoaderData, useParams } from 'react-router-dom';
import Toast, { ToastType } from '../UI/Button/Toast/Toast';

function Home() {
  // declare useState goes here
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isShowToast, setIsShowToast] = useState(false);
  const [toastType, setToastType] = useState<ToastType>(ToastType.INFO)
  const [labels, setLabels] = useState<ILabel[]>([])
  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });
  const [dragStarttargetCard, setDragStartTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });
  // use url props 
  const { workspaceId, myBoardId } = useParams() as unknown as IRouteParam;
  
  // store local storage to this workspaceData
  let workspaceData = useLoaderData() as IApiMock[]

  // set labels and boards when any changes in useParams
  useEffect(() => {
    try {
      const myBoards = workspaceData.filter(w => w.id == workspaceId)[0].myBoards.filter(b => b.id == myBoardId)[0];
      setLabels(myBoards.labels || [])
      setBoards(myBoards.boards);
    } catch (error) {
      toastHandler(true, 'InValid URL!', ToastType.ERROR)
    }
  }, [useParams()])

  //-----------toast-------------
  // toast message handling helper
  const toastHandler = (isShow: boolean, message: string, toastType: ToastType) => {
    setIsShowToast(isShow);
    setToastMessage(message);
    setToastType(toastType)
  }
  //-----------board actions-------------
  // create new board
  const addboardHandler = (name: string) => {
    const tempBoardsList = [...boards];
    tempBoardsList.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoardsList);
    toastHandler(true, `New Board '${name}' added Successfully!`, ToastType.SUCCESS)
  };

  // remove board
  const removeBoard = (boardId: number) => {
    const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList.splice(boardIndex, 1);
    setBoards(tempBoardsList);
    toastHandler(true, 'Successfully Removed!', ToastType.SUCCESS)

  };

  //-----------card actions-------------
  // add card
  const addCardHandler = (boardId: number, title: string) => {
    const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList[boardIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: '',
      tasks: [],
      desc: '',
      comments: []
    });
    setBoards(tempBoardsList);
    toastHandler(true, 'Task added Successfully!', ToastType.SUCCESS)
  };
  const removeCard = (boardId: number, cardId: number) => {
    const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoardsList);
    toastHandler(true, 'Successfully Removed!', ToastType.SUCCESS)
  };

  const updateCard = (boardId: number, cardId: number, card: ICard) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    tempBoardsList[boardIndex].cards[cardIndex] = card;

    setBoards(tempBoardsList);
  };

  //-----------drag and drop actions-------------

  const onDragStart = (boardId: number, cardId: number) => {
    if (targetCard.cardId === cardId) return;

    setDragStartTargetCard({
      boardId: boardId,
      cardId: cardId,
    });
  };

  const onDragEnter = (boardId: number, cardId: number) => {
    if (targetCard.cardId === cardId) return;
    setTargetCard({
      boardId: boardId,
      cardId: cardId,
    });
  };

  const dropToEmptyBoard = (boardId: number) => {
    const sourceBoardIndex = boards.findIndex(
      (item: IBoard) => item.id === dragStarttargetCard.boardId,
    );

    const { cardId } = dragStarttargetCard;
    const targetBoardIndex = (boards.findIndex(
      (item: IBoard) => item.id === boardId,
    ));
    const cardDetails = boards[sourceBoardIndex].cards.find(item => item.id === dragStarttargetCard.cardId)

    if (cardDetails) {
      const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex(
        (item) => item.id === cardId,
      );

      const tempBoardsList = [...boards];
      tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
      tempBoardsList[targetBoardIndex].cards.splice(
        0,
        0,
        cardDetails,
      );
      setBoards(tempBoardsList);
      setTargetCard({
        boardId: 0,
        cardId: 0,
      });
    }
  }

  const onDragEnd = (boardId: number, cardIdValue: number) => {
    let cardId = cardIdValue;

    // drag and drop for empty boards
    if (cardId === -1) {
      dropToEmptyBoard(boardId)
      return;
    }
    
    const sourceBoardIndex = boards.findIndex(
      (item: IBoard) => item.id === boardId,
    );
    if (sourceBoardIndex < 0) return;

    const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex(
      (item) => item.id === cardId,
    );
    if (sourceCardIndex < 0) return;

    const targetBoardIndex = boards.findIndex(
      (item: IBoard) => item.id === targetCard.boardId,
    );
    if (targetBoardIndex < 0) return;

    const targetCardIndex = boards[targetBoardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cardId,
    );
    if (targetCardIndex < 0) return;

    const tempBoardsList = [...boards];
    const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
    tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardsList[targetBoardIndex].cards.splice(
      targetCardIndex,
      0,
      sourceCard,
    );
    setBoards(tempBoardsList);

    setTargetCard({
      boardId: 0,
      cardId: 0,
    });
  };


  //-----------update local storage-------------
  useEffect(() => {
    if (boards) {
      workspaceData.filter(w => w.id == workspaceId)[0].myBoards.filter(b => b.id == myBoardId)[0].boards = boards;
      updateLocalStorage(workspaceData);
    }
  }, [boards]);

  return (<>
    <Toast text={toastMessage} isShow={isShowToast} onClose={() => setIsShowToast(false)} toastType={toastType} />
    {boards.map((item) => (
      <Board
        key={item.id}
        board={item}
        labels={labels}
        addCard={addCardHandler}
        removeBoard={() => removeBoard(item.id)}
        removeCard={removeCard}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragStart={onDragStart}
        updateCard={updateCard}
      />
    ))}
    <div className="trello-boards-last">
      <CustomInput
        displayClass="trello-boards-add-board"
        editClass="trello-boards-add-board-edit"
        placeholder="Enter Board Name"
        text="+ Add Board"
        onSubmit={addboardHandler}
      />
    </div>
  </>);
}

export default Home;