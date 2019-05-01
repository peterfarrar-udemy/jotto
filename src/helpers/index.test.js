import { getLetterMatchCount } from './'; 

describe('getLetterMatchCount', () => {
  const secretWord = 'party';
  test('returns the correct count when there are no matching letters', () => {
    const guessedWord = 'bones';
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);
    expect(letterMatchCount).toBe(0);
  });

  test('returns the correct count when there are 3 matching letters', () => {
    const guessedWord = 'train';
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);
    expect(letterMatchCount).toBe(3);
  });

  test('returns the correct count when there are duplicate matching letters in guess', () => {
    const guessedWord = 'parka';
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);
    expect(letterMatchCount).toBe(3);
  });

  test('returns the correct count when there are duplicate matching letters in secret word', () => {
    const guessedWord = 'pooch';
    const secretWord = 'pepper';
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);
    expect(letterMatchCount).toBe(3);
  });

  test('returns the correct count when there are duplicate matching letters in both words', () => {
    const guessedWord = 'paper';
    const secretWord = 'pepper';
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);
    expect(letterMatchCount).toBe(6);
  });
});
