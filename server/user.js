const users = [];

const addusers = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existinguser = users.find(user => user.room === room && user.name === name);
  if (existinguser) {
    return { error: 'User already exists' }; 
  }

  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeuser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0]; 
  }

  return null;
};

const getusers = (id) => {
  return users.find((user) => user.id === id); 
};

const getusersinroom = (room) => {
  return users.filter((user) => user.room === room); 
};

module.exports = { addusers, removeuser, getusers, getusersinroom };
