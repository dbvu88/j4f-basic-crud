var express = require('express');
var router = express.Router();



class InMemmory {
  constructor() {
    this.data = [
      { id: 1, name: "Blue Eyes" },
      { id: 2, name: "Cool Kid" },
      { id: 3, name: "Who Know" }
    ]
  }

  get(id = null) {
    if (id) {
      return this.data.filter(user => user.id == id)
    }
    return this.data
  }

  insert(user) {
    if (user.name) {
      const id = this.data.reduce((res, curr) => res.id > curr.id ? res : curr).id + 1;
      this.data.push({ id, ...user })
      return 1;
    }
    throw new Error('Bad Request')
  }

  remove(id) {
    const sizeInit = this.data.length
    this.data = this.data.filter(user => user.id != id)
    if (this.data.length < sizeInit) {
      return 1;
    }
    throw new Error('User Not Found')
  }
}

const users = new InMemmory()
/* GET users listing. */
router
  .get('/', (req, res, next) => {
    res.json(users.get());
  })
  .get('/:id', (req, res, next) => {
    res.json(users.get(req.params.id));
  })
  .post('/', (req, res, next) => {
    try {
      res.json(users.insert(req.body))
    }
    catch (ex) {
      next(ex)
    }
  })
  .put('/:id', (req, res, next) => {
    res.send('Got a PUT request ' + req.params.id)
  })
  .delete('/:id', (req, res, next) => {
    try {
      res.json(users.remove(req.params.id))
    }
    catch (ex) {
      next(ex)
    }
  });

module.exports = router;
