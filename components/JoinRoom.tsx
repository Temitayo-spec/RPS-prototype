import React from 'react';
import { useSocket } from '../utils/socketsContext';

const JoinRoom = ({ styles }: any) => {
  const { setRoomId, roomId, joinRoom, setOpenJoinRoom, joinRandom, setIsCreate } =
    useSocket();
  return (
    <div className={styles.join__room}>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <div className={styles.btns__ctn}>
        <button
          type="button"
          onClick={() => {
            joinRoom(roomId);
            setOpenJoinRoom(false);
            setIsCreate(true);
          }}
        >
          Join
        </button>
        <button
          type="button"
          onClick={() => {
            setIsCreate(false);
            setOpenJoinRoom(false);
          }}
        >
          Cancel
        </button>
      </div>
      <button
        className={styles.join__random}
        type="button"
        onClick={() => {
          joinRandom();
          setOpenJoinRoom(false);
          setIsCreate(true);
        }}
      >
        Join Random
      </button>
    </div>
  );
};

export default JoinRoom;
