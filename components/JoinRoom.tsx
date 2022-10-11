import React from 'react';
import { useSocket } from '../utils/socketsContext';

const JoinRoom = ({ styles }: any) => {
  const { setRoomId, roomId, joinRoom, setOpenJoinRoom, joinRandom } =
    useSocket();
  return (
    <div className={styles.join__room}>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          joinRoom(roomId);
          setOpenJoinRoom(false);
        }}
      >
        Join
      </button>
      <button
        type="button"
        onClick={() => {
          setOpenJoinRoom(true);
        }}
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={() => {
          joinRandom();
        }}
      >
        Join Random
      </button>
    </div>
  );
};

export default JoinRoom;
