// external
import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// internal
import CardLibraryContext from './CardLibraryContext.js';

// lol imports
import lol from '../../../lol_access/index.js';
const LibraryCard = lol.Classes.Card.LibraryCard;
const LibraryEnchantment = lol.Classes.Enchantment.LibraryEnchantment;

const CardLibraryContextProvider = ({ children }) => {
  const [cardLibrary, setCardLibrary] = useState([]);
  const [enchantmentLibrary, setEnchantmentLibrary] = useState([]);

  // axios call to get card library
  useEffect(() => {
    axios
      .get('/cards')
      .then((res) => {
        const tempLib = res.data.map((card) => {
          console.log('card data from context, pre-build:', card);
          const libraryCard = LibraryCard.fromJSON(card);
          console.log('libraryCard:', libraryCard);
          return libraryCard;
        });
        setCardLibrary(tempLib);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }, []);

  // axios call to get enchantment library
  useEffect(() => {
    axios
      .get('/enchantments')
      .then((res) => {
        const tempLib = res.data.map((enchantment) => {
          console.log('enchantment data from context, pre-build:', enchantment);
          const libraryEnchantment = LibraryEnchantment.fromJSON(enchantment);
          console.log('libraryEnchantment:', libraryEnchantment);
          return libraryEnchantment;
        });
        setEnchantmentLibrary(tempLib);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }, []);

  const value = {
    cardLibrary,
    setCardLibrary,
    enchantmentLibrary,
    setEnchantmentLibrary,
  };

  return (
    <CardLibraryContext.Provider value={value}>
      {children}
    </CardLibraryContext.Provider>
  );
};

export default CardLibraryContextProvider;
