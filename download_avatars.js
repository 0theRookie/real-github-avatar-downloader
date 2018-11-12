const request = require('request');
const secrets = require('./secrets.js');
const fs = require('fs');


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
        console.log(`Avatar URL ${Number(user) + 1}: `, result[user].avatar_url);
    }
})

function downloadImageByURL(url, filePath){
    console.log("Making request...");

    request.get(url)
        .on('error', (err) => {
            console.log("Error: ", err);
            throw err;
        })
        .on('response', (res) => {
            console.log("Got Response: ", res.statusCode);
        })
        .pipe(fs.createWriteStream(filePath));
        console.log("Image Downloading...")
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");