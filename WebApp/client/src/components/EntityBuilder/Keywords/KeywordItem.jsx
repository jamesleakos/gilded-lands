import React, { useState, useEffect, useContext } from 'react';

// lol
import lol from '../../../../../lol_access/index.js';
const LibraryKeyword = lol.Classes.Keyword.LibraryKeyword;
const KeywordType = lol.Enums.KeywordType;
const KeywordValueType = lol.Enums.KeywordValueType;

// internal
import Intcreaser from '../CardBuilder/Utility/Intcreaser.jsx';
import TitledIntcreaser from '../CardBuilder/Utility/TitledIntcreaser.jsx';
import TitledCycler from '../CardBuilder/Utility/TitledCycler.jsx';
import TitledCheckbox from '../CardBuilder/Utility/TitledCheckbox.jsx';
// css

import {
  KeywordItemStyled,
  KeywordValueItemStyled,
  ConditionItemStyled,
} from './styles/KeywordItem.styled.js';

function KeywordItem({ keyword, keywords, createNewKeyword, save, index }) {
  const changeKeywordType = (keywordType) => {
    // Create a new keyword
    const newKeyword = createNewKeyword(keywordType);

    // Replace the keyword in card.libraryKeywords
    const newLibraryKeywords = keywords.map((item, i) =>
      i === index ? newKeyword : item
    );

    // Save the card with the updated libraryKeywords
    save(newLibraryKeywords);
  };

  const saveKeyword = (keyword) => {
    const newLibraryKeywords = keywords.map((item, i) =>
      i === index ? keyword : item
    );
    save(newLibraryKeywords);
  };

  return (
    <KeywordItemStyled>
      <div className='keyword-item-content'>
        <button
          className='keyword-delete-button'
          onClick={() => {
            const newLibraryKeywords = keywords.filter(
              (item, i) => i !== index
            );
            save(newLibraryKeywords);
          }}
        >
          Delete
        </button>
        <TitledCycler
          title='Keyword Type'
          items={LibraryKeyword.typesOfKeywordsThatCanBeAssignedToCardByCreator().map(
            (type) => KeywordType[type]
          )}
          onItemChange={(keywordString) =>
            changeKeywordType(KeywordType[keywordString])
          }
          currentItem={KeywordType[keyword.keywordType]}
        />
        <div className='keyword-index-for-upgrades'>
          {`Index for Upgrades: ${keyword.indexForUpgrades}`}
        </div>
        <TitledCheckbox
          title='Is Keyword Permanent'
          checked={keyword.isPermanent}
          onCheckedChange={(checked) => {
            keyword.isPermanent = checked;
            saveKeyword(keyword);
          }}
        />
        <TitledIntcreaser
          title='Duration'
          int={keyword.duration}
          onIntChange={(value) => {
            keyword.duration = value;
            saveKeyword(keyword);
          }}
          minValue={0}
          maxValue={100}
        />
        <TitledCheckbox
          title='Starts Active'
          checked={keyword.startsActive}
          onCheckedChange={(checked) => {
            keyword.startsActive = checked;
            saveKeyword(keyword);
          }}
        />
        <div className='keyword-value-list-title'>Keyword Value List</div>
        <div className='keyword-value-list'>
          {keyword.keywordValueList.map((keywordValue, index) => (
            <KeywordValueItem
              key={index}
              keywordValue={keywordValue}
              keyword={keyword}
              saveKeyword={saveKeyword}
              index={index}
            />
          ))}
        </div>
        <div className='condition-list-title-area'>
          <div className='condition-list-title' title=''>
            Condition List
          </div>
          <button
            className='add-condition-button'
            onClick={() => {
              keyword.conditions.push(null);
              saveKeyword(keyword);
            }}
          />
        </div>
      </div>
    </KeywordItemStyled>
  );
}

function KeywordValueItem({ keywordValue, keyword, saveKeyword, index }) {
  return (
    <KeywordValueItemStyled className='keyword-value-item'>
      <div className='keyword-value-type'>
        {KeywordValueType[keywordValue.keywordValueType]}
      </div>
      <div className='keyword-value-values'>
        {keywordValue.values.map((value, index) => {
          return keywordValue.setByDesigner ? (
            <Intcreaser
              key={index}
              int={value}
              onIntChange={(newValue) => {
                keywordValue.values[index] = newValue;
                saveKeyword(keyword);
              }}
              minValue={0}
              maxValue={100}
            />
          ) : (
            <div key={index} className='keyword-value-value'>
              {value}
            </div>
          );
        })}
      </div>
    </KeywordValueItemStyled>
  );
}

function ConditionItem({ condition, keyword, saveKeyword, index }) {
  return (
    <ConditionItemStyled>
      <div className='condition-item-content'>
        <button
          className='condition-delete-button'
          onClick={() => {
            const newConditions = keyword.conditions.filter(
              (item, i) => i !== index
            );
            keyword.conditions = newConditions;
            saveKeyword(keyword);
          }}
        >
          Delete
        </button>
      </div>
    </ConditionItemStyled>
  );
}

export default KeywordItem;
