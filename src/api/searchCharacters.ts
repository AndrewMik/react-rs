export async function searchCharacters(searchString?: string) {
  const response = await fetch(
    `https://swapi.dev/api/people${
      searchString ? '/?search=' + searchString : ''
    }`
  );
  const data = await response.json();
  return data.results;
}
