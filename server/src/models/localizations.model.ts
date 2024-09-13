import client from "../services/pg.js";

type localisation = {
  localization: string;
  id: number;
};

async function getLocalizations() {
  const localizations = (await client.query<localisation>("SELECT * from Localizations")).rows;

  return localizations.map(({ localization }) => localization);
}

export { getLocalizations };
