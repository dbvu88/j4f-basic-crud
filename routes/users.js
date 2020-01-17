var express = require('express');
var router = express.Router();

/* GET users listing. */
router
  .get('/', function (req, res, next) {
    res.send('respond with a resource users');
  })

router.post('/', function (req, res, next) {
  res.send('Got a POST request')
})
  .put('/:id', (req, res, next) => {
    res.send('Got a PUT request ' + req.params.id)
  })
  .delete('/:id', (req, res, next) => {
    res.send('Got a DELETE request' + req.params.id)
  });

module.exports = router;
