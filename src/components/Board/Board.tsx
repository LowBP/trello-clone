import React, { useState } from 'react';
import { MoreHorizontal } from 'react-feather';

import Card from '../Card/Card';
import Dropdown from '../UI/Button/Dropdown/Dropdown';
import CustomInput from '../UI/Button/CustomInput/CustomInput';

import './Board.css';
import { IBoard, ICard, ILabel } from '../../interfaces/trello';

interface BoardProps {
  board: IBoard;
  labels: ILabel[];
  addCard: (boardId: number, title: string) => void;
  removeBoard: (boardId: number) => void;
  removeCard: (boardId: number, cardId: number) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
  onDragStart: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: ICard) => void;
}

function Board(props: BoardProps) {
  const {
    board,
    labels,
    addCard,
    removeBoard,
    removeCard,
    onDragEnd,
    onDragEnter,
    updateCard,
    onDragStart,
  } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  const onDragStartCard = (boardId: number, cardId: number) => {
    onDragStart(boardId, cardId)
  }

  return (
    <div className="board">
      <div className="board-inner" key={board?.id}
        onDragEnter={() => {
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          if (!board?.cards?.length) {
            onDragEnd(board.id, -1);
          }
        }}
      >
        <div className="board-header">
          <p className="board-header-title">
            {board?.title}
            <span>({board?.cards?.length || 0})</span>
          </p>
          <div
            className="board-header-title-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(prev => !prev)
            }}
          >
            <MoreHorizontal />
            {showDropdown && (<>
              <Dropdown
                class="board-dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => removeBoard(board?.id)}>Delete Board</p>
              </Dropdown>
            </>
            )}
          </div>
        </div>
        <div className="board-cards custom-scroll">
          {board?.cards?.map((item) => (
            <Card
              key={item.id}
              card={item}
              labels={labels}
              boardId={board.id}
              removeCard={removeCard}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
              updateCard={updateCard}
              onDragStart={onDragStartCard}
              comments={item.comments}
            />
          ))}
          <CustomInput
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass="board-add-card"
            editClass="board-add-card-edit"
            onSubmit={(value: string) => addCard(board?.id, value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
