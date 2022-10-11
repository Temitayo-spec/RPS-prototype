/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import io from 'socket.io-client';
import Display from '../components/Display';
import { useSocket } from '../utils/socketsContext';
import { CreateJoin, CreateRoom, JoinRoom, RoomDetails } from '../components';
import Image from 'next/image';
import { useEffect } from 'react';

const socket = io('http://localhost:5000');
const Home: NextPage = () => {
  const {
    canChoose,
    playerOneConnected,
    playerTwoConnected,
    playerId,
    playerOneChoice,
    setPlayerOneChoice,
    setPlayerTwoChoice,
    playerOneScore,
    playerTwoScore,
    room,
    openCreateRoom,
    openJoinRoom,
    roomId,
    error,
    winner,
    choose,
    isCreate,
    setError,
    setIsCreate,
  } = useSocket();

  useEffect(() => {
    if (error.status) {
      setTimeout(() => {
        setError({ status: false, message: '' });
        setIsCreate(false);
      }, 3000);
    }
  }, [error]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          src="/rps-logo.png"
          height={226}
          width={350}
          alt="rps-logo"
          objectFit="contain"
          priority
        />
        {!room && (
          <p className={styles.description}>Get started by creating a room</p>
        )}
        {error.status && <p className={styles.error}>{error.message}</p>}
        {!isCreate && <CreateJoin styles={styles} />}

        <RoomDetails styles={styles} />

        {openCreateRoom && <CreateRoom styles={styles} />}

        {openJoinRoom && <JoinRoom styles={styles} socket={socket} />}

        {winner.status && (
          <div className={styles.message}>{winner.message}</div>
        )}

        {room && (
          <Display
            styles={styles}
            playerOne={{
              connected: playerOneConnected,
              score: playerOneScore,
            }}
            setPlayerOneChoice={setPlayerOneChoice}
            setPlayerTwoChoice={setPlayerTwoChoice}
            choose={choose}
            socket={socket}
            playerTwo={{
              connected: playerTwoConnected,
              score: playerTwoScore,
            }}
            playerOneChoice={playerOneChoice}
            playerId={playerId}
            canChoose={canChoose}
            roomId={roomId}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
