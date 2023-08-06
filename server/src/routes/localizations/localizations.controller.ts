import { Response, Request } from "express";
import { getLocalizations } from "../../models/localizations.model.js";

async function httpGetLocalizations(req: Request, res: Response) {
  const localizations = await getLocalizations();

  if (localizations) return res.status(200).json({ status: "ok", message: "Response localizations", payload: localizations });
  else return res.status(404).json({ status: "error", message: "Filed fetch localizations" });
}

export { httpGetLocalizations };
