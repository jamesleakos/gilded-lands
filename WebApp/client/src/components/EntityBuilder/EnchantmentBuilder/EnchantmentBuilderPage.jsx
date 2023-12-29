// external
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import lol from '../../../../../lol_access/index.js';
const { Classes, Enums } = lol;
const LibraryEnchantment = Classes.Enchantment.LibraryEnchantment;

// internal
// hooks
import PlayerContext from '../../../contexts/PlayerContext.js';
import CardLibraryContext from '../../../contexts/CardLibraryContext.js';

// components
import EnchantmentBuilder from './EnchantmentBuilder.jsx';
import EnchantmentList from './EnchantmentList/EnchantmentList.jsx';
//css
import { EnchantmentBuilderPageStyled } from './styles/EnchantmentBuilderPage.styled.js';

function EnchantmentBuilderPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { gameManager } = useContext(PlayerContext);
  const { enchantmentLibrary, setEnchantmentLibrary } =
    useContext(CardLibraryContext);
  const [selectedEnchantment, setSelectedEnchantment] = useState(null);

  // #region Enchantment Library

  const [filteredEnchantmentLibrary, setFilteredEnchantmentLibrary] = useState(
    []
  );
  useEffect(() => {
    if (!enchantmentLibrary) return;
    setFilteredEnchantmentLibrary(enchantmentLibrary);
    if (!selectedEnchantment && enchantmentLibrary.length > 0)
      setSelectedEnchantment(enchantmentLibrary[0]);
  }, [enchantmentLibrary]);

  // #endregion

  // #region Enchantments API

  const createNewEnchantment = () => {
    axios
      .post('/enchantments')
      .then((res) => {
        const newEnchantment = LibraryEnchantment.fromJSON(res.data);
        setEnchantmentLibrary([...enchantmentLibrary, newEnchantment]);
        setSelectedEnchantment(newEnchantment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveEnchantment = (enchantment) => {
    if (!enchantment) {
      console.log('Save Enchantment - No enchantment selected');
      return;
    }
    console.log(
      'EnchantmentBuilderPage.saveEnchantment, enchantment (preJSON):',
      enchantment
    );
    const json = enchantment.toJSON();
    console.log('EnchantmentBuilderPage.saveEnchantment, json:', json);
    axios
      .post(`/enchantments/${enchantment.libraryId}`, json)
      .then((res) => {
        let tempEnchantments = [];
        const updatedEnchantment = LibraryEnchantment.fromJSON(res.data);
        if (
          !enchantmentLibrary.some(
            (c) => c.libraryId === updatedEnchantment.libraryId
          )
        ) {
          tempEnchantments = [...enchantmentLibrary, updatedEnchantment];
        } else {
          tempEnchantments = enchantmentLibrary.map((c) =>
            c.libraryId === updatedEnchantment.libraryId
              ? updatedEnchantment
              : c
          );
        }
        setEnchantmentLibrary(tempEnchantments);
        setSelectedEnchantment(updatedEnchantment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteEnchantment = (enchantment) => {
    if (!enchantment) {
      console.log('Delete Enchantment - No enchantment id');
      return;
    }

    if (enchantment.libraryId === null || enchantment.libraryId === undefined) {
      console.log(enchantment);
      console.log('Delete Enchantment - No enchantment id');
      return;
    }

    axios
      .delete(`/enchantments/${enchantment.libraryId}`)
      .then((res) => {
        // take out of enchantments
        const tempEnchantments = enchantmentLibrary.filter(
          (c) => c.libraryId !== enchantment.libraryId
        );
        setEnchantmentLibrary(tempEnchantments);
        setSelectedEnchantment(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // #endregion

  return (
    <EnchantmentBuilderPageStyled>
      <div className='content'>
        <EnchantmentList
          enchantments={filteredEnchantmentLibrary}
          setSelectedEnchantment={setSelectedEnchantment}
          selectedEnchantment={selectedEnchantment}
          createNewEnchantment={createNewEnchantment}
        />
        <EnchantmentBuilder
          enchantment={selectedEnchantment}
          saveEnchantment={saveEnchantment}
          deleteEnchantment={deleteEnchantment}
        />
      </div>
    </EnchantmentBuilderPageStyled>
  );
}

export default EnchantmentBuilderPage;
