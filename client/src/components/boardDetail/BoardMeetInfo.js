import { useEffect, useState } from 'react';
import styled from 'styled-components';
import getAddressByXY from '../../api/kakaoMap/getAddressByXY';
import { uctTokst } from '../../utils/dateConvert';
import { TbCalendarTime } from 'react-icons/tb';
import { MdPlace } from 'react-icons/md';
import Map from './Map';

const MeetInfoContainer = styled.div`
  width: 100%;
  padding: 0 1rem;

  > .meet-info {
    margin-bottom: 1rem;
  }

  .meet-info--content {
    padding-left: 1.5rem;
    padding-top: 3rem;
  }

  .meet-map {
    margin-top: 16px;
    height: 17rem;
    width: 100%;
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

const BoardMeetInfo = ({ meetInfo }) => {
  const [meetingPlace, setMeetingPlace] = useState('');

  useEffect(() => {
    const getMeetingPlace = async () => {
      const address = await getAddressByXY(meetInfo.x, meetInfo.y);

      setMeetingPlace(address);
    };
    getMeetingPlace();
  }, []);

  return (
    <MeetInfoContainer>
      <div className="meet-info">
        <div className="meet-date">
          <InfoLabelBox>
            <TbCalendarTime />
            <span>만나는 시간</span>
          </InfoLabelBox>
          <span className="meet-info--content">
            {uctTokst(meetInfo?.appointTime)}
          </span>
        </div>
      </div>
      <div className="meet-location">
        <InfoLabelBox>
          <MdPlace />
          <span>만나는 장소</span>
        </InfoLabelBox>
        <span className="meet-info--content">{meetingPlace}</span>
        <div className="meet-map" id="map">
          <Map meetLat={meetInfo?.y} meetLng={meetInfo?.x} />
        </div>
      </div>
    </MeetInfoContainer>
  );
};

export default BoardMeetInfo;
