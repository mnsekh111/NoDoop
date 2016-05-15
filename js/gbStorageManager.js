/*
 modules to store and retrieve from chrome.storage
 */

/*
 options is of type Object
 */
function save_options(options,callback) {
        chrome.storage.sync.set({
                TAB_KEEP: options["TAB_KEEP"],
                SCHEME:options["SCHEME"],
                REFRESH:options["REFRESH"]
        }, function(){
                callback();
        });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options(callback) {
        // Use default value color = 'red' and likesColor = true.
        chrome.storage.sync.get({
                TAB_KEEP: 'oldest',
                SCHEME:"sameurl",
                REFRESH:true

        }, function (items) {
                var options = {};
                options["TAB_KEEP"] = items.TAB_KEEP;
                options["SCHEME"] = items.SCHEME;
                options["REFRESH"]=items.REFRESH;
                callback(options);
        });
}
