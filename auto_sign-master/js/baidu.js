// 检测用户是不是登陆过百度，以进行签到
// 需要先引入jquery后才能使用
var hasLoginBaidu = false;
chrome.cookies.get({
  url: 'https://www.baidu.com',
  name : 'BDUSS'
}, function(cookie){
  if(cookie.value) {
    hasLoginBaidu = true;
  }
  else {
	  updatePopup('提示', '请你先在chrome中登陆一次百度的任何界面，然后再打开本程序');
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
  $('#app').append(`<tr> <td width="40%">${name} </td>  <td width="60%">${msg} </td></tr>`);
}

function getAllTieba() {
    url = 'http://tieba.baidu.com/mo/q-0--A7A763B05133684E31907568CADD9D43:FG=1--1-1-0--2--wapp_1492277052054_403/m?tn=bdFBW&tab=favorite';
    $.ajax({
        url : url,
        dataType: 'html',
        error: function (error) {
            //console.log(error);
        },
        success: function (data) {
            console.log(data);
            var nodes = $(data).find('a');
            var arr = [];
            $.each(nodes, function (index, item) {
               arr.push($(item).html());
            });
            arr.shift();
            arr.pop();
            arr.pop();
            $.each(arr, function (index, item) {
                //console.log(item);
                sign(item);
            });
        }
    });
}
// function f(){
//   getAllTieba();
//   setTimeout(f, 1000);
// }
// f();
///getAllTieba();
//getAllTieba();

