import { urls } from "../constants";

export const createUser = ({ uid, username }) => {
  return fetch(urls.user.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, username }),
  });
};
