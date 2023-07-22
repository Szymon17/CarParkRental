import { Response, Request } from "express";

function logoutUser(req: Request, res: Response) {
  console.log(req.cookies.jwt);

  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
}

export { logoutUser };
