// api respon
import { convertAppointTime, convertCreatedAt } from '../../utils/dateConvert';

export const decodeBoardforList = (initBoard) => {
  const newAppointTime = convertAppointTime(initBoard.appointTime);

  return {
    id: initBoard.boardId,
    title: initBoard.title,
    content: initBoard.content,
    authorId: initBoard.member.memberId,
    authorName: initBoard.member.nickName,
    authorImg:
      initBoard.member.profileImg ||
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    meetingPlace: initBoard.meetingPlace,
    appointDate: newAppointTime.date,
    appointTime: newAppointTime.time,
    countLike: initBoard.countLike,
    boardStatus: initBoard.boardStatus,
  };
};

export const decodeBoardList = (initBoardList) => {
  return initBoardList.map((board) => decodeBoardforList(board));
};

export const decodeBoardDetail = (initBoard) => {
  const newAppointTime = convertAppointTime(initBoard.appointTime);

  return {
    id: initBoard.boardId,
    title: initBoard.title,
    content: initBoard.content,
    member: {
      ...initBoard.member,
      profileImage:
        initBoard.member.profileImage ||
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    meetInfo: {
      meetingPlace: initBoard.meetingPlace,
      appointDate: newAppointTime.date,
      appointTime: newAppointTime.time,
    },
    countLike: initBoard.countLike,
    boardStatus: initBoard.boardStatus,
    createdAt: convertCreatedAt(initBoard.createdAt),
    commentsLength: initBoard.comments.length,
    comments: initBoard.comments,
  };
};
