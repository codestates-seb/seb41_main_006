// api respon
import { convertCreatedAt, convertAppointTime } from '../../utils/dateConvert';

export const decodeBoard = (initBoard) => {
  const newAppointTime = convertAppointTime(initBoard.appointTime);

  return {
    id: initBoard.id,
    title: initBoard.title,
    createdAt: convertCreatedAt(initBoard.createdAt),
    content: initBoard.content,
    authorId: initBoard.member?.id,
    authorName: initBoard.member?.nickName,
    authorImg: initBoard.member?.profile_img,
    meetingPlace: initBoard.meetingPlace,
    appointDate: newAppointTime.date,
    appointTime: newAppointTime.time,
    countLike: initBoard.countLike,
    status: initBoard.status,
  };
};

export const decodeBoardList = (initBoardList) => {
  return initBoardList.map((board) => decodeBoard(board));
};

// export

// export const decodeDetailBoard = (initBoard) => {

// };
