import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getBoardList } from '../../api/board/board';
import styled from 'styled-components';
import MateBoardCard from './MateBoardCard';
import { GrayDog } from '../common/DogSvg';
import { media } from '../../style/styleUtils';
import DogFootLoading from '../DogFootLoading';

const BoardList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.5rem;
`;

const BoardItem = styled.li`
  height: 15rem;
  position: relative;
  padding-top: 65%;

  ${media.desktop`
    padding-top: 40%;
  `}
  ${media.mobile`
    padding-top: 30%;
  `}
`;

const NoBoardBox = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: var(--main-font-color);

  > .dog-face {
    width: 13rem;
    height: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > .no-pets-msg {
    margin-bottom: 1rem;
    font-weight: 500;
  }
`;

const MateBoardList = () => {
  const { code } = useSelector((state) => state.address);
  // ref
  const observerRef = useRef();
  const boxRef = useRef(null);

  const res = useInfiniteQuery(
    ['boards', code],
    async ({ pageParam = 1 }) =>
      await getBoardList({ page: pageParam, size: 5, placeCode: code }),
    {
      getNextPageParam: (lastPage) => {
        // 다음 페이지 요청에 사용될 pageParam값 return 하기
        return lastPage.pageInfo.page + 1;
      },
      placeholderData: [],
    }
  );

  // IntersectionObserver 설정
  const intersectionObserver = (entries, io) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 관찰하고 있는 entry가 화면에 보여지는 경우
        io.unobserve(entry.target); // entry 관찰 해제
        res.fetchNextPage(); // 다음 페이지 데이터 요청
      }
    });
  };

  // useEffect
  useEffect(() => {
    if (observerRef.current) {
      // 기존에 IntersectionObserver이 있을 경우
      observerRef.current.disconnect(); // 연결 해제
    }

    observerRef.current = new IntersectionObserver(intersectionObserver); // IntersectionObserver 새롭게 정의
    boxRef.current && observerRef.current.observe(boxRef.current); // boxRef 관찰 시작
  }, [res]); // res값이 변경될때마다 실행

  if (res.isLoading || !code)
    return (
      <div>
        <DogFootLoading />
      </div>
    );

  if (!res?.data?.pages || res?.data?.pages.length === 0) {
    return (
      <NoBoardBox>
        <div className="no-pets-msg">주소에 해당하는 모임 글이 없습니다!</div>
        <div className="dog-face">
          <GrayDog></GrayDog>
        </div>
      </NoBoardBox>
    );
  }
  return (
    <BoardList>
      {res.data.pages.map((page, pageIdx) => {
        return page.data.map((el, idx) => (
          <BoardItem
            key={el.boardId}
            ref={
              page.data.length * pageIdx + idx ===
              res.data.pages.length * page.data.length - 1
                ? boxRef
                : null
            }
          >
            <MateBoardCard board={el} />
          </BoardItem>
        ));
      })}
    </BoardList>
  );
};

MateBoardList.defaultProps = {
  boardList: [],
};

export default MateBoardList;
