

// from baidu.js file
// getAllTieba();
//from vpnsigin.js file
getAllData();

$('#jxlust').click(function () {
    chrome.tabs.create({
        url: 'https://github.com/jxlust',
        active: true,
    }, function (tab) {
        console.log(tab);
    });
});



