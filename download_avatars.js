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

    request(options, function(err, res, body) {
        // console.log("Parsed Body: ", JSON.parse(body))
        cb(err, JSON.parse(body));
    });
}

getRepoContributors("jquery", "jquery", (err, result) => {
    if(err) throw err;

    console.log("Result: ", result);
    // let parsedResult = JSON.parse(result);

    // console.log("Errors:", err);
    // console.log("Result:", parsedResult);
})