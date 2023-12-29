import React, { useState, useEffect, useContext } from 'react';

// internal
import RoomTile from './RoomTile.jsx';
import TileScroller from '../../../UtilityComponents/TileScroller.jsx';
// css
import { RoomSelectionStyled } from './styles/RoomSelection.styled.js';

function RoomSelection({ socket }) {
  const [rooms, setRooms] = useState([]);
  const [myRoomID, setMyRoomID] = useState(null);
  const [amReady, setAmReady] = useState(false);

  //#region SOCKET EVENTS and EMITS

  useEffect(() => {
    if (!socket) return;

    // subscribe to socket events
    socket.on('rooms-update', (data) => {
      const newRooms = data;
      setRooms(newRooms);
    });

    socket.on('you-joined-room', (room_id) => {
      setMyRoomID(room_id);
    });

    socket.on('you-left-room', (room_id) => {
      setMyRoomID(null);
    });

    socket.on('set-ready', (data) => {
      setAmReady(data);
    });

    // on load and socket request the rooms
    socket.emit('request-rooms');

    return () => {
      // have to leave everything here, otherwise the socket events will be subscribed to multiple times
      socket.off('rooms-update');
      socket.off('you-joined-room');
      socket.off('you-left-room');
      socket.off('set-ready');
    };
  }, [socket]);

  const requestNewRoom = () => {
    if (!socket) return;
    socket.emit('request-new-room');
  };

  const joinRoom = (room_id) => {
    socket.emit('request-join-room', {
      room_id,
    });
  };

  const leaveRoom = () => {
    socket.emit('request-leave-room');
  };

  const setReady = () => {
    socket.emit('request-toggle-ready');
  };

  //#endregion

  return (
    <RoomSelectionStyled>
      <h3 className='underlined-title'>Select a Room</h3>
      <div className='button-bar'>
        <div className='menu-button' onClick={requestNewRoom}>
          Create New Room
        </div>
        <div className='menu-button' onClick={leaveRoom}>
          Leave Room
        </div>
        <div className='menu-button' onClick={setReady}>
          {amReady ? 'Set Not Ready' : 'Set Ready'}
        </div>
      </div>

      {rooms.length > 0 ? (
        rooms.map((room, index) => {
          return (
            <RoomTile
              key={room.id + myRoomID + index + ''}
              room={room}
              joinRoom={joinRoom}
              selected={room.id === myRoomID}
            />
          );
        })
      ) : (
        <div className='no-rooms'>
          <p>No open rooms. Create a new one!</p>
        </div>
      )}
    </RoomSelectionStyled>
  );
}

export default RoomSelection;
