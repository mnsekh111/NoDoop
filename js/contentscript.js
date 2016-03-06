/**
 * Created by mnsekh111 on 2/17/2016.
 */
console.log("Content script loaded");

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    console.log(request.message);
    var toast = new Android_Toast({content:request.message,duration:2000,position:'top'});
});