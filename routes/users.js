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
    return -1;
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
    if (req.body.name) {
      res.json(users.insert(req.body))
    }
    next(new Error('Bad Request'))
  })
  .put('/:id', (req, res, next) => {
    res.send('Got a PUT request ' + req.params.id)
  })
  .delete('/:id', (req, res, next) => {
    res.send('Got a DELETE request' + req.params.id)
  });

module.exports = router;
