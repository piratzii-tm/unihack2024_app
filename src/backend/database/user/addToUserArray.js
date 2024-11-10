import { getDatabase, ref, set, get } from "firebase/database";

export const addIdToUserArray = async (userId, newId) => {
  const db = getDatabase();
  const userRef = ref(db, `user/${userId}`);

  // Retrieve current IDs
  const snapshot = await get(userRef);
  let currentUser = snapshot.val();

  currentUser.stories.push(newId);
  currentUser.progress.push({
    [newId]: 0,
  });

  await set(userRef, currentUser);
};
