export interface ILabel {
  color: string;
  text: string;
}

export interface ITask {
  id: number;
  completed: boolean;
  text: string;
}

export interface IComment {
  userName: string,
  date: Date;
  text: string;
}

export interface ICard {
  id: number;
  title: string;
  labels: ILabel[];
  date: string;
  tasks: ITask[];
  desc?: string;
  comments: IComment[]
}

export interface IBoard {
  id: number;
  title: string;
  cards: ICard[];
}

export interface IMyBoard {
  name: string;
  id: number;
  boards: IBoard[]
  meta: myBoardMeta,
  labels: ILabel[],
}
export interface myBoardMeta {
  backgroundColor: string;
}
export interface IApiMock {
  workspaceName: string;
  id: number;
  myBoards: IMyBoard[]
}

export interface IRouteParam {
  workspaceId: number;
  myBoardId: number

}

export interface ISideBarProps {
  myBoards: IMyBoard[];
  selectedId: number;
}