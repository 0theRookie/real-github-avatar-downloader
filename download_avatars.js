const request = require('request');

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb){

}

getRepoContributors("jquery", "jquery", (err, result) => {
    console.log("Errors:", err);
    console.log("Result:", result);
})