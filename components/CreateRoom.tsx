import React from 'react';
import { useSocket } from '../utils/socketsContext';

type Props = {
  styles: any;
};

const CreateRoom = ({ styles }: Props) => {
  const { setOpenCreateRoom, createRoom, roomId, setRoomId, setIsCreate } =
    useSocket();
  return (
    <div className={styles.create__room}>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      />
      <div className={styles.btns__ctn}>
        <button
          type="button"
          onClick={() => {
            createRoom(roomId);
            setOpenCreateRoom(false);
          }}
        >
          Create Room
        </button>
        <button
          type="button"
          onClick={() => {
            setOpenCreateRoom(false);
            setIsCreate(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
