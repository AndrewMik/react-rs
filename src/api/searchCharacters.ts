import { SearchCharactersResponse } from '../components/Search/Search';

export async function searchCharacters(
  searchString?: string,
  page?: number
): Promise<SearchCharactersResponse | null> {
  try {
    const query = buildQueryString(searchString, page);

    const response = await fetch(`https://swapi.dev/api/people${query}`);
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

const buildQueryString = (searchString?: string, page?: number): string => {
  const query: string[] = [];

  if (searchString) {
    query.push(`search=${searchString}`);
  }

  if (page) {
    query.push(`page=${page.toString()}`);
  }

  const result = query.join('&');

  return result ? `/?${result}` : '';
};
