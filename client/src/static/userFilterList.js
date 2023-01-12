const userFilterList = [
  {
    id: 1,
    type: 'checkbox',
    name: 'size',
    title: '강아지 크기',
    inputList: [
      {
        id: 1,
        value: 'small',
        label: '소형견',
      },
      {
        id: 2,
        value: 'medium',
        label: '중형견',
      },
      {
        id: 3,
        value: 'large',
        label: '대형견',
      },
    ],
  },
  {
    id: 2,
    type: 'checkbox',
    name: 'age',
    title: '견주 연령대',
    inputList: [
      {
        id: 1,
        value: '10',
        label: '10대',
      },
      {
        id: 2,
        value: '20',
        label: '20대',
      },
      {
        id: 3,
        value: '30',
        label: '30대',
      },
      {
        id: 4,
        value: '40',
        label: '40대',
      },
    ],
  },
  {
    id: 3,
    type: 'radio',
    name: 'gender',
    title: '견주 성별',
    inputList: [
      {
        id: 1,
        value: 'both',
        label: '전체',
      },
      {
        id: 2,
        value: 'man',
        label: '남',
      },
      {
        id: 3,
        value: 'woman',
        label: '여',
      },
    ],
  },
];

export default userFilterList;
