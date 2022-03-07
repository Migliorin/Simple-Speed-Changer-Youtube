browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo && changeInfo.status == "complete"){
        
        browser.tabs.sendMessage(tabId, {data: tab}, function(response) {
            console.log(response);
        });

    }
});