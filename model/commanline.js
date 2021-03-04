const git_config = {
    email: "jaykittiwat2542@gmail.com",
    username: "jaykittiwat"
}

var path = require("path");

exports.path = path.resolve("./Dictionary_DB")



exports.gitConfig = {
    emailAndUsername: 'git config --global user.email ' + git_config.email + ' && ' + 'git config --global user.name ' + git_config.username,
}