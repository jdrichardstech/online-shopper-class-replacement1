const router = require('express').Router();
const Category = require('./categories/models/Category');

router.get('/add-category', (req, res, next) => {
  return res.render('admin/add-category');
});

router.post('/add-category', (req, res, next) => {
  const category = new Category();
  category.name = req.body.name;
  category
    .save()
    .then(category => {
      console.log(category);
      //   res.json({ category });
      req.flash('message', 'Category created');
      return res.redirect('/api/admin/add-category');
    })
    .catch(err => {
      if (err.code === 11000) {
        req.flash('error', 'Category already exists');
        // res.json({ message: 'Exists' });
        return res.redirect('/api/admin/add-category');
      } else {
        return next(err);
      }
    });
});

module.exports = router;
