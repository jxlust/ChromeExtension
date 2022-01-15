

const PERIOD = 1 * 60; // 定时运行的脚本 单位 ：分钟
const SIGN_TIEBA = 'sign_tieba_time_event';
const NOTIFICATION_TEST = 'notification_test';

chrome.alarms.create(SIGN_TIEBA, {
    delayInMinutes:0,
    periodInMinutes: PERIOD
});
chrome.alarms.create(NOTIFICATION_TEST, {
    delayInMinutes:0,
    periodInMinutes: 60,
});
chrome.alarms.onAlarm.addListener(function (ev) {
    if(ev.name == SIGN_TIEBA) {
        getAllTieba();
    }
    else if(ev.name == NOTIFICATION_TEST) {
        chrome.notifications.create("id", opt, function(ev){
            console.log(ev);
        });
    }
});

var opt = {
  type: "basic",
  title: "整点报时",
  message: "现在时间是 "+(new Date()).getHours()+':00',
  iconUrl: "../img/icon.png"
}

