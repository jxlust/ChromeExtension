// 检测用户是不是登陆过百度，以进行签到
// 需要先引入jquery后才能使用
var hasLoginPage = false;
chrome.cookies.get({
  url: 'https://glados.rocks',
  name : 'koa:sess.sig',
}, function(cookie){
    console.log('cookie:',cookie);
  if(cookie.value) {
    hasLoginPage = true;
  }
  else {
	  updatePopup('提示', '请你先在chrome中登陆一次glados的任何界面，然后再打开本程序');
  }
});

function sign(keyWord) {
  //console.log(keyWord)
  var baseUrl = 'http://tieba.baidu.com/mo/m/m';
  $.ajax({
    url : baseUrl,
    dataType: 'html',
    data :{
      kw: keyWord
    },
    error: function(error){
      //console.log(error);
      updatePopup(keyWord , '签到失败');
    },
    success: function(data) {
      var nodes = $(data).find('a');
      var signUrl = null;
      var signed = false;
      var reSigned = false;
      var spans = $(data).find('span');
      $.each(spans, function(index, span) {
        span = $(span);
        if(span.html() == '已签到') {
          reSigned = true;
          return false;
        }
      });
      $.each(nodes, function(index, item) {
        item = $(item);
        if(item.html() === '签到') {
          signUrl = item.attr('href');
          signed = true;
          return false;
        }
      });
      //console.log(signUrl);
      if(signUrl === null) {
        if(reSigned) {
          updatePopup(keyWord , '已经签到过');
        }
        else if(signed) {
          updatePopup(keyWord , '签到成功');
        }
        else {
          updatePopup(keyWord , '无法签到');
        }

        return ;
      }
      $.ajax({
          url : 'http://tieba.baidu.com' + signUrl,
          dataType : 'html',
          error: function (error) {
              //console.log(error);
              updatePopup(keyWord , '签到失败');
          },
          success: function (data) {
              //console.log(data);
              updatePopup(keyWord , '签到成功');
          }
      });
    }
  });
}

function updatePopup(name, msg){
  $('#app').append(`${name} --- ${msg}`);
}

function getAllData() {
    console.log('get all data.. ');
}

document.addEventListener('DOMContentLoaded', function()
{
	console.log('login plugin:',getAllData());
});
