db.createUser({
  user: 'app-user',
  pwd: 'app-pass',
  roles: [
    {
      role: 'readWrite',
      db: 'open-academic-db',
    },
  ],
});
