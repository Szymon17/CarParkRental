import localizationsMongo from "./localizations.mongo.js";

async function getLocalizations() {
  const localizations = await localizationsMongo.find({}, "-_id");

  return localizations.map(({ localization }) => localization);
}

export { getLocalizations };
