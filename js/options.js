var glob_options = {
        TAB_KEEP: "oldest",
        SCHEME: "sameurl",
        REFRESH: true
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

                if (glob_options["REFRESH"] == true)
                        document.getElementById("refresh").checked = true;
                else
                        document.getElementById("refresh").checked = false;

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

                if (document.getElementById("refresh").checked)
                        glob_options["REFRESH"] = true;
                else {
                        glob_options["REFRESH"] = false;
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


