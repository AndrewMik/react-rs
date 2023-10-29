export async function searchCharacters(searchString?: string) {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people${
        searchString ? '/?search=' + searchString : ''
      }`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
}
