import styled from 'styled-components';
import { MdPlace, MdKeyboardArrowRight } from 'react-icons/md';
import { useState } from 'react';
import Map from './Map';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { TbCalendarTime } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';
import getAddressByXY from '../../api/kakaoMap/getAddressByXY';

const MapBox = styled.div`
  color: black;
  width: 100%;
  height: 31rem;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
    0 4px 4px rgba(0, 0, 0, 0.11), 0 6px 8px rgba(0, 0, 0, 0.11),
    0 8px 16px rgba(0, 0, 0, 0.11);

  .meet-date {
    margin-bottom: 10px;
    position: relative;
    z-index: 3;

    #time-input {
      width: 100%;
      border-radius: 10px;
      padding: 3px 6px;
      border: 1px solid #b7a69e;
      font-size: 16px;
    }
  }

  .map-box {
    padding: 10px;

    input {
      width: 100%;
      border-radius: 10px;
      padding: 4px 6px;
      border: 1px solid #b7a69e;
      font-size: 16px;
    }
  }

  label {
    display: block;
    color: #401809;
    font-weight: bold;
    padding-bottom: 8px;
  }

  span {
    padding-left: 8px;
  }

  .meet-map {
    margin-top: 16px;
    height: 17rem;
    width: 100%;
  }

  .selected-day {
    background: #ad8b73;
    border-radius: 50%;
    font-weight: 700;
  }

  .gray-day {
    color: #aba8b9;
  }

  .meet-place-inform {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--main-font-color);
    text-align: center;

    p {
      text-decoration: underline var(--main-font-color);
      text-underline-position: under;
    }
  }
`;

const MyDatePicker = styled(DatePicker)``;

const MapContainer = ({
  setDateInfo,
  setLocInfo,
  setEditDate,
  setEditPlace,
  meetingPlace,
  boardX,
  boardY,
}) => {
  const location = useLocation();

  const [inputPlace, setInputPlace] = useState('');
  const [place, setPlace] = useState('');
  const [selectPlace, setSelectPlace] = useState('');

  getAddressByXY(boardX, boardY).then((result) => {
    const defaultPlace = document.getElementById('informPlace');
    if (!selectPlace) {
      defaultPlace.innerHTML = result;
    }
  });

  const handleInput = (e) => {
    setInputPlace(e.target.value);
  };

  const [meetingDate, setMeetingDate] = useState(new Date());

  const [month, setMonth] = useState(new Date().getMonth());

  const handleMonthChange = (meetingDate) => {
    setMonth(meetingDate.getMonth());
  };

  // ?????? ?????? ?????? ?????? ????????? ?????? ??????
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setPlace(inputPlace);
      setInputPlace('');
    }
  };

  // ?????? ?????????????????? ???????????? ??????
  const handleClose = () => {
    if (location.pathname === '/newmate') {
      setDateInfo(meetingDate);
    } else {
      setEditDate(meetingDate);
    }
  };

  return (
    <MapBox>
      <form className="inputForm">
        <div className="map-box">
          <div className="meet-date">
            <label htmlFor="meet-date">
              <TbCalendarTime />
              <span>????????? ??????</span>
            </label>
            <MyDatePicker
              placeholderText={'????????? ???????????????'}
              className="my_datepicker"
              dayClassName={(d) =>
                d.getDate() === meetingDate.getDate()
                  ? 'custom-day selected-day'
                  : d.getMonth() === month
                  ? 'custom-day'
                  : 'custom-day gray-day'
              }
              locale={ko}
              selected={meetingDate}
              onChange={(date) => setMeetingDate(date)}
              showTimeSelect // ?????? ?????? ??????
              showPopperArrow={false}
              minDate={new Date()} // ?????? ?????? ????????? ?????? ??????
              filterTime={filterPassedTime}
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="??????"
              dateFormat="yyyy.MM.dd (eee) a h??? mm???"
              onMonthChange={handleMonthChange}
              name="date_input"
              onCalendarClose={handleClose}
              value={meetingDate}
            />
          </div>
          <div className="meet-place">
            <label htmlFor="meet-place">
              <MdPlace />
              <span>????????? ??????</span>
            </label>
            <input
              type="text"
              id="meet-place"
              placeholder="????????? ???????????????"
              onChange={handleInput}
              onKeyDown={handleEnter}
              defaultValue={
                location.pathname !== '/newmate' ? meetingPlace : ''
              }
              required
            ></input>
          </div>
          <div className="meet-map" id="map">
            <Map
              searchPlace={place}
              setLocInfo={setLocInfo}
              setEditPlace={setEditPlace}
              setSelectPlace={setSelectPlace}
              selectPlace={selectPlace}
            />
          </div>
        </div>
      </form>
      <div className="meet-place-inform">
        ????????? ??????
        <MdKeyboardArrowRight /> <p id="informPlace">{selectPlace}</p>
      </div>
    </MapBox>
  );
};

export default MapContainer;
