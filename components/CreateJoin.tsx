import React from 'react';
import { Socket } from 'socket.io-client';
import { useSocket } from '../utils/socketsContext';

type Props = {
  styles: any;
};

const CreateJoin = ({ styles }: Props) => {
  const { isCreate, setIsCreate, setOpenCreateRoom, setOpenJoinRoom } =
    useSocket();
  return (
    <div className={styles.grid}>
      <>
        <button
          type="button"
          className={styles.card}
          onClick={() => {
            setOpenCreateRoom(true);
            setIsCreate(true);
          }}
        >
          <h3>Create Room &rarr;</h3>
          <p>Click here to create a room</p>
        </button>

        <button
          type="button"
          className={styles.card}
          onClick={() => {
            setOpenJoinRoom(true);
          }}
        >
          <h3>Join Room &rarr;</h3>
          <p>Click here to join a room</p>
        </button>
      </>
    </div>
  );
};

export default CreateJoin;
