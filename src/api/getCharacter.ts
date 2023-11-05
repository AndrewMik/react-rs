import { Params } from 'react-router';
import { Character } from '../components/Characters/Characters';

export async function getCharacter(
  params: Params<string>
): Promise<Character | null> {
  const { id } = params;

  try {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}
