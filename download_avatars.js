const request = require('request');
const secrets = require('./secrets.js');
const fs = require('fs');

const r_Owner = process.argv[2];
const r_Name = process.argv[3];




console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb){
    let options = {
        'url': "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'Authorization': 'token ' + secrets.GITHUB_TOKEN,
            'User-Agent': '0theRookie'
        }
    };

    //passes necessary info (options and body) into cb func (JSON request)
    request(options, function(err, res, body) {
        cb(err, JSON.parse(body));
    });
}


getRepoContributors(r_Owner, r_Name, (err, result) => {
    if(err) throw err;

    //loop through parsed object and log value of avatar_url in each user
    for(let user in result){
        let resultUSER = result[user].login;
        let resultURL = result[user].avatar_url;

        console.log(`User Name ${Number(user) + 1}: ${resultUSER}`);
        downloadImageByURL(resultURL, `avatars/${resultUSER}.jpg`);
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

