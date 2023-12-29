import React, { useState, useEffect, useContext } from 'react';

// lol
import lol from '../../../../../lol_access/index.js';
const LibraryKeyword = lol.Classes.Keyword.LibraryKeyword;
const LibraryKeywordValue = lol.Classes.Keyword.LibraryKeywordValue;
const LibraryKeywordValueInfo = lol.Classes.Keyword.LibraryKeywordValueInfo;
const KeywordType = lol.Enums.KeywordType;

// internal
import KeywordItem from './KeywordItem.jsx';

// css
import { KeywordListStyled } from './styles/KeywordList.styled.js';

function KeywordList({ keywords, save }) {
  const handleNewKeyword = (keywordType) => {
    const newKeyword = createNewKeyword(keywordType);
    keywords.push(newKeyword);
    save(keywords);
  };

  const createNewKeyword = (keywordType) => {
    // check if keyword type is in KeywordType
    if (!Object.values(KeywordType).includes(keywordType)) {
      throw new Error('Invalid keyword type');
    }

    const keywordValueList = [];
    for (let info of LibraryKeyword.libraryKeywordValueInfoForType(
      keywordType
    )) {
      console.log('info', info);
      keywordValueList.push(
        new LibraryKeywordValue(
          info.keywordValueType,
          Array(info.numberOfValuesNeeded).fill(0),
          info.setByDesigner
        )
      );
    }
    let minIndex = 0;
    if (keywords.length > 0) {
      const indices = keywords.map((lk) => lk.indexForUpgrades);
      while (indices.includes(minIndex)) {
        minIndex++;
      }
    }
    const newKeyword = new LibraryKeyword(
      keywordType,
      minIndex,
      'Designer Description',
      true,
      0, // duration
      true, // starts active
      keywordValueList,
      [], // conditions
      'image_name'
    );
    return newKeyword;
  };

  return (
    <KeywordListStyled>
      <div className='keyword-content'>
        <button
          className='add-keyword-button'
          onClick={() => handleNewKeyword(KeywordType.DamageModification)}
        >
          Add Keyword
        </button>
        <div className='keyword-items-container'>
          {keywords.map((keyword, index) => (
            <KeywordItem
              key={index}
              index={index}
              keyword={keyword}
              keywords={keywords}
              createNewKeyword={createNewKeyword}
              save={save}
            />
          ))}
        </div>
      </div>
    </KeywordListStyled>
  );
}

export default KeywordList;
