var express = require("express");
var router = express.Router();
var PostTitleController = require("../controllers/PostTitleController.js");
const Scraper = require("../controllers/scraper");

/*
 * GET
 */

router.get("/", async (req, res) => {
    var scrapedData = Scraper.runScraper();
    //res.send(JSON.stringify(scrapedData));
    return res.redirect("/home");
});

router.get("/home", PostTitleController.list);

/*
 * GET
 */
router.get("/:id", PostTitleController.show);

/*
 * POST
 */
router.post("/", PostTitleController.create);

/*
 * PUT
 */
router.put("/:id", PostTitleController.update);

/*
 * DELETE
 */
router.delete("/:id", PostTitleController.remove);

module.exports = router;
