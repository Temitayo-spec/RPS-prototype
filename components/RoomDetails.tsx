import React from 'react';
import { Socket } from 'socket.io-client';
import { useSocket } from '../utils/socketsContext';
import { useFunc } from '../utils/useFunc';

type JoinRoomProps = {
  styles: any;
};

const RoomDetails = ({ styles }: JoinRoomProps) => {
  const { roomId, playerOneConnected, playerTwoConnected, room, playerId } =
    useSocket();
  return (
    <div>
      {room && (
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Room ID: {roomId}</h3>
            <p>Share this ID with your friend to join the room</p>
          </div>

          <div className={styles.card}>
            <h3>Player ID: {playerId}</h3>
            <p>Use this ID to join the room</p>
          </div>

          <div className={styles.card}>
            <h3>Player 1</h3>
            <p>
              Player 1 is {playerOneConnected ? 'connected' : 'not connected'}
            </p>
          </div>

          <div className={styles.card}>
            <h3>Player 2</h3>
            <p>
              Player 2 is {playerTwoConnected ? 'connected' : 'not connected'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
