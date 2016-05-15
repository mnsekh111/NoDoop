var glob_options = {
        TAB_KEEP: "oldest",
        SCHEME: "sameurl"
};

$(document).ready(function () {
        restore_options(function (options) {
                glob_options = options;
                if (glob_options["TAB_KEEP"] == "recent")
                        document.getElementById("recent").checked = true;
                else
                        document.getElementById("oldest").checked = true;

                if (glob_options["SCHEME"] == "samedomain")
                        document.getElementById("samedomain").checked = true;
                else
                        document.getElementById("sameurl").checked = true;
                sendToBackGround();
        });
        $("#btnSave").click(function () {

                if (document.getElementById("recent").checked) {
                        glob_options["TAB_KEEP"] = "recent";
                } else {
                        glob_options["TAB_KEEP"] = "oldest";
                }

                if (document.getElementById("samedomain").checked)
                        glob_options["SCHEME"] = "samedomain";
                else {
                        glob_options["SCHEME"] = "sameurl";
                }
                save_options(glob_options, function () {
                        sendToBackGround();
                });
        });
});

function sendToBackGround() {
        chrome.runtime.sendMessage({GOPTIONS: glob_options}, function (response) {
        });
}


