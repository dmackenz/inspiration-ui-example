const { GitHubService } = require('./GitHubService')

console.log(GitHubService.loginToApp())
console.log(GitHubService.isUserLoggedIn())
console.log(GitHubService.getRepoList())
console.log(GitHubService.getRepoArchiveLink("DiljotSG", "1password-python"))
