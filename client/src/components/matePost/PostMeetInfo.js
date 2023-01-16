import styled from 'styled-components';
import { FaRegCalendar } from 'react-icons/fa';
import { BiTimeFive } from 'react-icons/bi';
import { MdPlace } from 'react-icons/md';

const MeetInfoContainer = styled.div`
  width: 100%;
  height: 30rem;
  padding: 0 1rem;

  > .meet-info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    > .meet-date {
      width: 60%;
    }

    > .meet-time {
      width: 40%;
    }
  }

  .meet-info--content {
    padding-left: 1.5rem;
    padding-top: 3rem;
  }
`;

const InfoLabelBox = styled.div`
  display: flex;
  align-items: center;
  color: var(--main-font-color);
  font-weight: 600;
  margin-bottom: 0.25rem;

  > span {
    margin-left: 0.5rem;
  }
`;

const PostMeetInfo = () => {
  return (
    <MeetInfoContainer>
      <div className="meet-info">
        <div className="meet-date">
          <InfoLabelBox>
            <FaRegCalendar />
            <span>날짜</span>
          </InfoLabelBox>
          <span className="meet-info--content">2022.01.23 (목)</span>
        </div>
        <div className="meet-time">
          <InfoLabelBox>
            <BiTimeFive />
            <span>시간</span>
          </InfoLabelBox>
          <span className="meet-info--content">오후 7시</span>
        </div>
      </div>
      <div className="meet-location">
        <InfoLabelBox>
          <MdPlace />
          <span>만나는 장소</span>
        </InfoLabelBox>
        <span className="meet-info--content">서울 송파구 잠실 7동</span>
        <div>map</div>
      </div>
    </MeetInfoContainer>
  );
};

export default PostMeetInfo;
