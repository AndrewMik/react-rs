export async function getCharacters() {
  const response = await fetch(`https://swapi.dev/api/people`);
  const data = await response.json();
  return data.results;
}
