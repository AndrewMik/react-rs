export async function searchCharacters(searchString?: string, error?: string) {
  const response = await fetch(
    `https://swapi.dev/api/people${error ? error : ''}${
      searchString ? '/?search=' + searchString : ''
    }`
  );
  const data = await response.json();
  return data.results;
}
