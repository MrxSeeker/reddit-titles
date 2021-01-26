const cheerio = require("cheerio");
const Nightmare = require("nightmare");
const postTitle = require("../models/PostTitleModel");
const PostTitleController = require("./PostTitleController");

const nightmare = Nightmare({ show: false });
const url = "http://reddit.com";

var loaded = false;

module.exports = {
    runScraper: async () => {
        var data = [];

        if (!loaded) {
            await nightmare
                .goto(url)
                .wait("body")
                .evaluate(() => document.querySelector("body").innerHTML)
                .then((response) => {
                    data = parseData(response);
                    loaded = true;
                })
                .catch((err) => {
                    console.log(err);
                    data = null;
                    nightmare.refresh();
                    return err;
                });
        } else {
            await nightmare
                .evaluate(() => document.querySelector("body").innerHTML)
                .then((response) => {
                    data = parseData(response);
                })
                .catch((err) => {
                    console.log(err);
                    data = null;
                    nightmare.refresh();
                    return err;
                });
        }
        return data;
    },
};

function parseData(html) {
    const scrapedData = [];
    const $ = cheerio.load(html);
    $('[class^="_1oQyIsiPHYt6nx7VOmd1sz"]').each((i, element) => {
        const h3s = $(element).find("h3");
        const title = $(h3s).text();
        const hrefs = $(element).find("a:eq(2)").attr('href');
        const hyperlink = url + hrefs;
        //console.log(hyperlink, "<<LINK do objava \n");

        const entry = {
            title,
        };
        scrapedData.push(entry);
        var postInfo = new postTitle({
            titleName: title,
            postLink: hyperlink,
        });

        postInfo.save(function (err, PostTitle) {
            if (err) {
                return;
                // return res.status(500).json({
                //     message: "Error when creating user",
                //     error: err,
                // });
            }
            //return res.status(201).json(PostTitle);
        });
    });

    return scrapedData;
}
