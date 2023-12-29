import React, { useState, useEffect, useContext } from 'react';

// internal
// css
import { RoomTileStyled } from './styles/RoomTile.styled.js';

function RoomTile({ room, joinRoom, selected }) {
  const formatImageLink = (link) => {
    return `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) ), url('${link}')`;
  };

  return (
    <RoomTileStyled
      onClick={() => {
        joinRoom(room.id);
      }}
      style={{
        backgroundImage: formatImageLink(
          'https://ik.imagekit.io/hfywj4j0a/LoL/canyon_city_N6bb4PTK3.png'
        ),
      }}
    >
      <div className={`interior-border ${selected ? ' selected' : ''}`}></div>
      <h3 className={`room-title ${selected ? ' selected' : ''}`}>
        {room.name}
      </h3>
      {room.players.map((player, index) => {
        return <div key={player.name + index + ''}>{player.name}</div>;
      })}
    </RoomTileStyled>
  );
}

export default RoomTile;
