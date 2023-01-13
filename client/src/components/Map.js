import styled from 'styled-components';
import { FaRegCalendar } from 'react-icons/fa';
import { BiTimeFive } from 'react-icons/bi';
import { MdPlace } from 'react-icons/md';

const MapContainer = styled.div`
  color: black;
  width: 100%;
  /* height: 200px; */
  height: 30rem;
  padding: 10px;
  /* border: 1px solid black; */
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
      padding: 2px 6px;
      border: 1px solid #b7a69e;
      font-size: 16px;
    }
  }

  .map-box {
    padding: 10px;

    input {
      width: 100%;
      border-radius: 10px;
      padding: 3px 6px;
      border: 1px solid #b7a69e;
      font-size: 16px;
    }
  }

  .mmet-date {
    width: 20px;
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
`;

const Map = () => {
  return (
    <MapContainer>
      <div className="meet-info">
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
        <form className="map-form">
          <label htmlFor="meet-place">
            <MdPlace />
            <span>만나는 장소</span>
          </label>
          <input type="text" id="meet-place"></input>
        </form>
      </div>
    </MapContainer>
  );
};

export default Map;
