import styled from 'styled-components';
import { MdPlace } from 'react-icons/md';
import { useState } from 'react';
import Map from './Map';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { TbCalendarTime } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';
import dummyBoards from '../../api/board/dummyBoards';
// import { convertAppointDate } from '../../utils/dateConvert';
const MapBox = styled.div`
  color: black;
  width: 100%;
  height: 30rem;
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
`;

const MyDatePicker = styled(DatePicker)``;

const MapContainer = ({
  setDateInfo,
  setLocInfo,
  setEditDate,
  setEditPlace,
}) => {
  const [inputPlace, setInputPlace] = useState('');
  const [place, setPlace] = useState('');

  const handleInput = (e) => {
    setInputPlace(e.target.value);
  };

  //const handleSubmit = (e) => {
  //  e.preventDefault();
  //  const form = e.target;
  //  console.log(form.date_input.value);
  //  setDateInfo(meetingDate);
  //};

  const [meetingDate, setMeetingDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth());

  const handleMonthChange = (meetingDate) => {
    setMonth(meetingDate.getMonth());
  };

  // 현재 시간 기준 지난 시간은 선택 불가
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

  //const handleSubmit = () => {
  //  setDateInfo(meetingDate);
  // };

  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const location = useLocation();

  // 등록 페이지에서만 작동하는 함수
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
              <span>만나는 날짜</span>
            </label>
            <MyDatePicker
              placeholderText={'날짜를 선택하세요'}
              className="my_datepicker"
              dayClassName={(d) =>
                d.getDate() === meetingDate.getDate()
                  ? 'custom-day selected-day'
                  : d.getMonth() === month
                  ? 'custom-day'
                  : 'custom-day gray-day'
              }
              locale={ko}
              selected={
                isFocus
                  ? meetingDate
                  : new Date(dummyBoards.data[0].appointTime)
              }
              onChange={(date) => setMeetingDate(date)}
              showTimeSelect // 시간 선택 가능
              showPopperArrow={false}
              minDate={new Date()} // 오늘 날짜 이후만 선택 가능
              filterTime={filterPassedTime}
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="시간"
              dateFormat="yyyy.MM.dd (eee) a h시 mm분"
              onMonthChange={handleMonthChange}
              // onSelect={handleDateSelect}
              name="date_input"
              onFocus={handleFocus}
              onCalendarClose={handleClose}
              value={meetingDate}
            />
          </div>
          <div className="meet-place">
            <label htmlFor="meet-place">
              <MdPlace />
              <span>만나는 장소</span>
            </label>
            <input
              type="text"
              id="meet-place"
              placeholder="장소를 입력하세요"
              onChange={handleInput}
              //value={inputPlace}
              onKeyDown={handleEnter}
              defaultValue={dummyBoards.data[0].meetingPlace}
            ></input>
          </div>
          <div className="meet-map" id="map">
            <Map
              searchPlace={place}
              setLocInfo={setLocInfo}
              setEditPlace={setEditPlace}
            />
          </div>
        </div>
      </form>
    </MapBox>
  );
};

export default MapContainer;
