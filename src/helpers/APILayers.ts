import { APIMockData } from '../mocks/dummyData';
import { IApiMock } from '../interfaces/trello';

const LocalStorageKeyName = 'trello';
//Data Layer handling
export class BoardAPI {
  async fetchWorkSpaceList(): Promise<IApiMock[]> {
    const apiData: IApiMock[] = APIMockData;
    let workSpaceList: IApiMock[] = [];
    //first check local storage if local storage is empty then add api mock data as seed
    if (localStorage.getItem(LocalStorageKeyName)) {
      const localStorageData: IApiMock[] = JSON.parse(
        localStorage.getItem(LocalStorageKeyName) ?? '',
      );
      workSpaceList = [...localStorageData];
    } else {
      workSpaceList = [...apiData];
      updateLocalStorage(workSpaceList);
    }

    return workSpaceList;
  }
}

//Business Layer
export async function fetchWorkSpaceList(): Promise<IApiMock[]> {
  const api = new BoardAPI();
  return api.fetchWorkSpaceList();
}
export function updateLocalStorage(data: IApiMock[]) {
  localStorage.setItem(LocalStorageKeyName, JSON.stringify(data));
}
