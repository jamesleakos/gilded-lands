class LibraryCardEntry {
  libraryId: number;
  amount: number;

  constructor(libraryId: number, amount: number) {
    this.libraryId = libraryId;
    this.amount = amount;
  }

  toJSON() {
    return {
      libraryId: this.libraryId,
      amount: this.amount,
    };
  }

  static fromJSON(json: any): LibraryCardEntry {
    return new LibraryCardEntry(json.libraryId, json.amount);
  }
}

export default LibraryCardEntry;
