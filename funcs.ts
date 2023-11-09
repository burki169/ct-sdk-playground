export function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const getACityName = () => {
  const places = [
    "newyork",
    "london",
    "athens",
    "paris",
    "breda",
    "berlin",
    "oslo",
    "milan",
    "amsterdam",
    "brussels",
    "metz",
    "sofia",
    "roma",
    "porto",
    "madrid",
    "seoul",
    "ankara",
    "arnhem",
    "new-delhi",
    "munich",
    "ghent",
    "brussels",
    "toronto",
  ];

  return places[between(0, places.length - 1)];
};

export const partOftheDay = () =>
  ["morning", "afternoon", "evening"][between(0, 2)];

export const generateVariantKey = () =>{
  const city = getACityName();
  const date = new Date(2023, between(0, 11), 1);
  const month = date
      .toLocaleString("default", { month: "long" })
      .toLowerCase();

  return `${city}-${month}-${partOftheDay()}`;
};