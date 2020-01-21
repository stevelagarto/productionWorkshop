module.exports = (req, res, next) => {
  //console.log('req user............', req.user);
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  next();
};


// desencriptar cookie, y buscar User.findby