import { IApiMock } from '../interfaces/trello';

export const APIMockData: IApiMock[] = [
  {
    workspaceName: 'Trello Project',
    id: 1,
    myBoards: [
      {
        name: 'Project - 1',
        id: 1,
        meta: {
          backgroundColor: 'rgb(0, 121, 191)',
        },
        labels: [{ color: '#cf61a1', text: 'Urgent' }, { color: '#1ebffa', text: 'Frontend' }, { color: '#9975bd', text: 'DB' }, { color: '#8da377', text: 'figma' }, { color: '#4fcc25', text: 'API' }],
        boards: [
          {
            id: 1651319512266.7095,
            title: 'Current Sprint',
            cards: [
              {
                id: 1651319552926.0933,
                title: 'Task1',
                labels: [{ color: '#cf61a1', text: 'Urgent' }],
                date: '2022-12-24',
                tasks: [
                  { id: 1651319625559.8025, completed: true, text: 'Task1_subtask1' },
                  { id: 1651319629650.8945, completed: true, text: 'Task1_subtask2' },
                  { id: 1651319633774.9905, completed: true, text: 'Task1_subtask3' },
                ],
                desc: 'Task1 Detail Description',
                comments: [
                  { date: new Date(), userName: 'Pranav V', text: 'Planing to release on next week!' }],
              },
              {
                id: 1651319568365.593,
                title: 'Task2',
                labels: [{ color: '#1ebffa', text: 'Frontend' }],
                date: '',
                tasks: [],
                comments: [],
              },
            ],
          },
          {
            id: 1651319523126.113,
            title: 'In Progress',
            cards: [
              {
                id: 1651319672685.5078,
                title: 'Task3',
                labels: [{ color: '#9975bd', text: 'DB' }],
                date: '',
                tasks: [
                  { id: 1651319728301.3855, completed: false, text: 'restore db' },
                ],
                comments: [],
              },
            ],
          },
          {
            id: 1651319530017.122,
            title: 'In-Review',
            cards: [
              {
                id: 1651319677070.0732,
                title: 'Task4',
                labels: [{ color: '#8da377', text: 'figma' }],
                date: '2022-12-24',
                tasks: [],
                comments: [],
              },
            ],
          },
          {
            id: 1651319535931.4182,
            title: 'Completed',
            cards: [
              {
                id: 1651319680948.0479,
                title: 'Task5',
                labels: [{ color: '#4fcc25', text: 'API' }],
                date: '2022-12-24',
                tasks: [
                  { id: 1651319820180.9648, completed: false, text: 'GraphQl' },
                  { id: 1651319833779.3252, completed: true, text: 'Restful API' },
                ],
                comments: [],
              },
            ],
          },

        ],
      },
      {
        name: 'Project - 2',
        id: 2,
        meta: {
          backgroundColor: 'rgb(81, 152, 57)',
        },
        labels: [{ color: '#cf61a1', text: 'P1' }, { color: '#9975bd', text: 'DB' }],
        boards: [
          {
            id: 1651319512266.7095,
            title: 'Planing',
            cards: [
              {
                id: 1651319552926.0933,
                title: 'Task1',
                labels: [{ color: '#cf61a1', text: 'P1' }],
                date: '2022-12-24',
                tasks: [
                  { id: 1651319625559.8025, completed: true, text: 'Task1_subtask1' },
                ],
                desc: 'Task1 Detail Description',
                comments: [],
              },
            ],
          },
          {
            id: 1651319523126.113,
            title: 'In Progress',
            cards: [
              {
                id: 1651319672685.5078,
                title: 'Task3',
                labels: [{ color: '#9975bd', text: 'DB' }],
                date: '',
                tasks: [
                ],
                comments: [],
              },
            ],
          },
          {
            id: 1651319530017.122,
            title: 'In-Review',
            cards: [
            ],
          },
          {
            id: 1651319535931.4182,
            title: 'Completed',
            cards: [
            ],
          },

        ]
      }
    ]
  }
]
