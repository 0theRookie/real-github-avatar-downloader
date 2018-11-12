const request = require('request');
const secrets = require('./secrets.js');

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb){
    let options = {
        'url': "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'Authorization': 'token ' + secrets.GITHUB_TOKEN,
            'User-Agent': '0theRookie'
        }
    };

    //passes necessary info (options and body) into cb func
    request(options, function(err, res, body) {
        cb(err, JSON.parse(body));
    });
}


getRepoContributors("jquery", "jquery", (err, result) => {
    if(err) throw err;

    //loop through parsed object and log value of avatar_url in each user
    for(let user in result){
        console.log(result[user].avatar_url);
    }
    // console.log("url: ", result);
    // let parsedResult = JSON.parse(result);

    // console.log("Errors:", err);
    // console.log("Result:", parsedResult);
})