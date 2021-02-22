const git_config = {
    email: "jaykittiwat2542@gmail.com",
    username: "jaykittiwat"
}

exports.path = '/home/jaykittiwat/Dictionary-server/Dictionary_DB'

exports.gitConfig = {
    emailAndUsername: 'git config --global user.email ' + git_config.email + ' && ' + 'git config --global user.name ' + git_config.username,
}