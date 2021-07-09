const { createNote, updateNote, deleteNote } = require("./NoteMutation");

const { createGroup, updateGroup } = require("./GroupMutation");

const { createUser, updateUser, deleteUser } = require("./UserMutation");

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  createUser,
  updateUser,
  createGroup,
  updateGroup,
  deleteUser,
};
