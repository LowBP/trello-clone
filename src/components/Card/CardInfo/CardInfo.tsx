import React, { useEffect, useState } from 'react';
import { Activity, Calendar, CheckSquare, List, Tag, Trash, Type } from 'react-feather';
import { colorsList, lastModifiedTime } from '../../../helpers/Util';
import Modal from '../../UI/Button/Modal/Modal';
import CustomInput from '../../UI/Button/CustomInput/CustomInput';

import './CardInfo.css';
import { ICard, IComment, ILabel, ITask } from '../../../interfaces/trello';
import Tags from '../../Common/Tags';
import Avatar from '../../Avatar/Avatar';
interface CardInfoProps {
  onClose: () => void;
  card: ICard;
  boardId: number;
  labels: ILabel[]
  updateCard: (boardId: number, cardId: number, card: ICard) => void;
}

function CardInfo(props: CardInfoProps) {
  const { onClose, card, boardId, updateCard, labels } = props;
  const [selectedColor, setSelectedColor] = useState('');
  const [cardValues, setCardValues] = useState<ICard>({
    ...card,
  });

  const updateTitle = (value: string) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDesc = (value: string) => {
    setCardValues({ ...cardValues, desc: value });
  };

  const addLabel = (label: ILabel) => {
    const index = cardValues.labels.findIndex(
      (item) => item.text === label.text,
    );
    if (index > -1) return; //if label text already exist then return

    setSelectedColor('');
    setCardValues({
      ...cardValues,
      labels: [...cardValues.labels, label],
    });
    labels.push(label);
  };

  const removeLabel = (label: ILabel) => {
    const tempLabels = cardValues.labels.filter(
      (item) => item.text !== label.text,
    );

    setCardValues({
      ...cardValues,
      labels: tempLabels,
    });
  };

  const addLabelToMyBoards = (label: ILabel) => {
    setCardValues({
      ...cardValues,
      labels: [label, ...cardValues.labels],
    });
  };


  const addTask = (value: string) => {
    const task: ITask = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setCardValues({
      ...cardValues,
      tasks: [...cardValues.tasks, task],
    });
  };

  const addComment = (text: string) => {
    const task: IComment = {
      date: new Date(),
      userName: 'Pranav V',
      text: text,
    };
    setCardValues({
      ...cardValues,
      comments: [...cardValues.comments, task],
    });
  };

  const deleteComment = (date: Date) => {
    const comments = [...cardValues.comments];
    const tempComments = comments.filter((item) => item.date !== date);

    setCardValues({
      ...cardValues,
      comments: tempComments,
    });
  }


  const removeTask = (id: number) => {
    const tasks = [...cardValues.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setCardValues({
      ...cardValues,
      tasks: tempTasks,
    });
  };

  const updateTask = (id: number, value: boolean) => {
    const tasks = [...cardValues.tasks];

    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = Boolean(value);

    setCardValues({
      ...cardValues,
      tasks,
    });
  };

  const calculatePercent = () => {
    if (!cardValues.tasks?.length) return 0;
    const completed = cardValues.tasks?.filter(
      (item) => item.completed,
    )?.length;
    return (completed / cardValues.tasks?.length) * 100;
  };

  const updateDate = (date: string) => {
    if (!date) return;

    setCardValues({
      ...cardValues,
      date,
    });
  };

  useEffect(() => {
    if (updateCard) updateCard(boardId, cardValues.id, cardValues);
  }, [cardValues]);

  const calculatedPercent = calculatePercent();

  const chooseLabelList = () => {
    let chooseLabels = labels;
    cardValues.labels?.forEach(l => {
      chooseLabels = chooseLabels.filter(label => label.text !== l.text && label.color !== l.color)
    });
    return chooseLabels;
  }

  const getLastModifiedTime = (date: any) => {
    const currentDate: any = new Date()
    const prevDate: any = new Date(date)
    return lastModifiedTime((Math.abs(prevDate - (currentDate))))
  }
  return (
    <Modal onClose={onClose}>
      <div className="cardinfo">
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Type />
            <p>Title</p>
          </div>
          <CustomInput
            defaultValue={cardValues.title}
            text={cardValues.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
            buttonText={cardValues.title && 'Update'}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <List />
            <p>Description {cardValues.desc}</p>
          </div>
          <CustomInput
            defaultValue={cardValues.desc}
            text={cardValues.desc || 'Add a Description'}
            placeholder="Enter description"
            onSubmit={updateDesc}
            buttonText={cardValues.desc && 'Update'}
          />
        </div>


        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Tag />
            <p>Labels</p>
          </div>
          <div className="cardinfo-box-labels">
            {cardValues.labels?.map((item, index) => (
              <Tags key={index} item={item} removeLabel={removeLabel} />
            ))}
          </div>
          <p className='sub-heading'>Add Labels</p>
          <div className="cardinfo-box-labels">
            {chooseLabelList()?.map((item, index) => (
              <Tags key={index} item={item} addLabel={addLabelToMyBoards} />
            ))}
          </div>
          <ul>
            {colorsList.map((item, index) => (
              <li
                key={index}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? 'li-active' : ''}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <CustomInput
            text="+ Add"
            placeholder="Enter label text"
            onSubmit={(value: string) =>
              addLabel({ color: selectedColor, text: value })
            }
          />
        </div>


        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Calendar />
            <p>Date</p>
          </div>
          <input
            type="date"
            defaultValue={cardValues.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <CheckSquare />
            <p>Tasks</p>
          </div>
          <div className="cardinfo-box-progress-bar">
            <div
              className="cardinfo-box-progress"
              style={{
                width: `${calculatedPercent}%`,
                backgroundColor: calculatedPercent === 100 ? 'limegreen' : '',
              }}
            />
          </div>
          <div className="cardinfo-box-task-list">
            {cardValues.tasks?.map((item) => (
              <div key={item.id} className="cardinfo-box-task-checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? 'completed' : ''}>{item.text}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <CustomInput
            text={'Add New Task'}
            placeholder="Please add your new task"
            onSubmit={addTask}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Activity />
            <p>Activity</p>
          </div>
          <div className='activity-wrapper'>
            <div className='comment-input-wrapper'>

              <Avatar />
              <CustomInput
                text='Write a Comment..'
                placeholder="Please add your comment"
                onSubmit={addComment}
                buttonText='Save'
              />
            </div>

            {[...cardValues.comments].reverse().map((item, index) => (
              <div className='comment-input-wrapper' key={index}>
                <Avatar />
                <div className='comment-input-block'>
                  <div className='comment-meta-details'>
                    <div className='user-name'>{item.userName}</div>
                    <div className='last-modified-time'>{getLastModifiedTime(item.date)}</div>
                  </div>
                  <CustomInput
                    text={item.text}
                    placeholder="Please add your comment"
                    onSubmit={addComment}
                    buttonText='Save'
                  />
                  <div className='remove-comment' onClick={() => deleteComment(item.date)}>Delete</div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
