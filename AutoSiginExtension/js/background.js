let color = "#3aa757";
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);

  const PERIOD = 12 * 60; // 定时运行的脚本 单位 ：分钟
  const SIGN_TIEBA = "sign_tieba_time_event";
  const NOTIFICATION_TEST = "notification_test";

  const myNotice = null;
  chrome.alarms.create(SIGN_TIEBA, {
    delayInMinutes: 0,
    periodInMinutes: PERIOD,
  });
  chrome.alarms.create(NOTIFICATION_TEST, {
    // delayInMinutes: .1,
    // periodInMinutes: 0.1,
    periodInMinutes: 60,
    // when:
  });
  chrome.alarms.onAlarm.addListener(function (ev) {
    if (ev.name == SIGN_TIEBA) {
      startSigin();
      console.log("SIGN_TIEBA alarms: start...");
    } else if (ev.name == NOTIFICATION_TEST) {
      console.log("NOTIFICATION_TEST: start...");
      //id得唯一，空字符也可以，保证每次都弹框`my-notifications${Date.now()}`
      chrome.notifications.create("", opt, function (ev) {
        console.log("notifications create:", ev);
      });
      // chrome.notifications.clear('', function(){ });
      // chrome.notifications.update("idid", opt, function (ev) {
      //   console.log("notice update");
      // });
    }
  });

  var opt = {
    type: "basic",
    title: "整点报时",
    message:
      "现在时间是 " + new Date().getHours() + ":" + new Date().getMinutes(),
    iconUrl: "../images/logo.png",
  };
});

function notificationSiginOk() {
  let okOpt = {
    type: "basic",
    title: "签到",
    message: "签到成功" + new Date().getHours() + ":" + new Date().getMinutes(),
    iconUrl: "../images/logo.png",
  };
  chrome.notifications.create(
    `my-notifications${Date.now()}`,
    okOpt,
    function (ev) {}
  );
}

async function startSigin() {
  let hasLoginPage = false;
  let nameLists = ["_ga","koa:sess","koa:sess.sig", "_gid"];
  let promises = nameLists.map((item) => {
    return chrome.cookies.get({
      url: "https://glados.rocks",
      name: item,
    });
  });
  let cookies = [];
  for (let p of promises) {
    let c = await p;
    cookies.push(`${c.name}:${c.value}`);
  }
  console.log("cookies all:", cookies);

  let cookiesStr = cookies.join(';')
  chrome.storage.sync.set({ startSigin: cookiesStr});
  if (cookies.length) {
    hasLoginPage = true;
    fetchPost(cookiesStr)
  } else {
    console.log("请你先在chrome中登陆一次glados的任何界面，然后再打开本程序");
  }
}
async function fetchPost(cookie) {
  let myInit = {
    method: "POST",
    headers: {
      "Content-Type": "image/jpeg",
      cookie: cookie
    },
    mode: "cors",
    cache: "default",
  };
  const myRequest = new Request(
    "https://glados.rocks/api/user/checkin",
    myInit
  );
  let result = await fetch(myRequest);
  console.log('fetch sigin result:',result);
  if(result.status === 200 && result.ok){
    notificationSiginOk();
  }
}

async function fetcLogin(cookie) {
  let myInit = {
    method: "POST",
    headers: {
      "Content-Type": "image/jpeg",
      cookie: cookie
    },
    mode: "cors",
    cache: "default",
  };
  const myRequest = new Request(
    "https://glados.rocks/api/login",
    myInit
  );
  let result = await fetch(myRequest);
  console.log('fetch sigin result:',result);

}