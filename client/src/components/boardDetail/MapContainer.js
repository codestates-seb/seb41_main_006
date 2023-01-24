import styled from 'styled-components';
import { FaRegCalendar } from 'react-icons/fa';
import { BiTimeFive } from 'react-icons/bi';
// import { TbCalendarTime } from 'react-icons/tb';
import { MdPlace } from 'react-icons/md';
import { useState } from 'react';
import Map from './Map';
// import DatePicker from 'react-datepicker';

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

  .meet-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    input {
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
`;

const MapContainer = ({ setLocInfo }) => {
  const [inputPlace, setInputPlace] = useState('');
  const [place, setPlace] = useState('');

  const onChange = (e) => {
    setInputPlace(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputPlace);
    setInputPlace('');
  };

  // const [startDate, setStartDate] = useState(new Date());

  // const filterPassedTime = (time) => {
  //   const currentDate = new Date();
  //   const selectedDate = new Date(time);

  //   return currentDate.getTime() < selectedDate.getTime();
  // };

  return (
    <MapBox>
      <form className="inputForm" onSubmit={handleSubmit}>
        <div className="meet-info">
          {/* <TbCalendarTime /> */}
          {/* <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="yyyy.MM.dd hh:mm"
          /> */}
          <div className="meet-date">
            <label htmlFor="date-input">
              <FaRegCalendar />
              <span>날짜</span>
            </label>
            <input type="date" id="date-input"></input>
          </div>
          <div className="meet-time">
            <label htmlFor="time-input">
              <BiTimeFive />
              <span>시간</span>
            </label>
            <input type="time" id="time-input"></input>
          </div>
        </div>

        <div className="map-box">
          <label htmlFor="meet-place">
            <MdPlace />
            <span>만나는 장소</span>
          </label>
          <input
            type="text"
            id="meet-place"
            placeholder="장소를 입력하세요"
            onChange={onChange}
            value={inputPlace}
          ></input>
          <div className="meet-map" id="map">
            <Map searchPlace={place} setLocInfo={setLocInfo} />
          </div>
        </div>
      </form>
    </MapBox>
  );
};

export default MapContainer;