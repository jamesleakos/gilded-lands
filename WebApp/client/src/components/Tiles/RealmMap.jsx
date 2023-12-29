import React from 'react';
// internal
// components
import Hexmap from './Hexmap.jsx';
// css
import { RealmMapStyled } from './styles/RealmMap.styled.js';

const RealmMap = ({
  tiles,
  onClickTile,
  onRightClickTile,
  onMouseEnterTile,
  onMouseLeaveTile,
  outlineOnHover,
  outlinedTileIndices,
  selfSelectorReturn,
  resizeTrigger,
}) => {
  return (
    <RealmMapStyled className='realm-map'>
      {!tiles || !tiles.length ? (
        <div>NO TILES FOUND</div>
      ) : (
        <Hexmap
          tiles={tiles}
          onClickTile={onClickTile}
          onRightClickTile={onRightClickTile}
          onMouseEnterTile={onMouseEnterTile}
          onMouseLeaveTile={onMouseLeaveTile}
          outlineOnHover={outlineOnHover}
          outlinedTileIndices={outlinedTileIndices}
          selfSelectorReturn={selfSelectorReturn}
          resizeTrigger={resizeTrigger}
        />
      )}
    </RealmMapStyled>
  );
};

export default RealmMap;
