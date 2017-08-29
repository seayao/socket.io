var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
  res.render('index', { title: 'chat',nick:req.session.nick});
});
router.post('/', function(req, res){
  if(req.body.nick == ""){
    req.flash('error', "请先设置昵称！");
    return res.redirect('/');
  }else {
    req.session.nick = req.body.nick;
    res.redirect('/');
  }
});

//注销
router.get('/logout', function (req, res) {
  req.session.nick = null;//清空session
  req.flash('success', "注销成功！");
  res.redirect('/');
});

module.exports = router;
