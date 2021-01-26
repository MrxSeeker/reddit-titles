var PostTitleModel = require("../models/PostTitleModel.js");

var axios = require("axios");
var cheerio = require("cheerio");
var PAGE_URL = "https://www.thoughtco.com/languages-4133094";
/**
 * PostTitleController.js
 *
 * @description :: Server-side logic for managing PostTitles.
 */
module.exports = {
    /**
     * PostTitleController.list()
     */
    list: function (req, res) {
        PostTitleModel.find(function (err, PostTitles) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting PostTitle.",
                    error: err,
                });
            }
            return res.json(PostTitles);
        });
    },

    /**
     * PostTitleController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PostTitleModel.findOne({ _id: id }, function (err, PostTitle) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting PostTitle.",
                    error: err,
                });
            }
            if (!PostTitle) {
                return res.status(404).json({
                    message: "No such PostTitle",
                });
            }
            return res.json(PostTitle);
        });
    },

    /**
     * PostTitleController.create()
     */
    create: function (req, res) {
        var PostTitle = new PostTitleModel({
            titleName: req.body.titleName,
        });

        PostTitle.save(function (err, PostTitle) {
            if (err) {
                return res.status(500).json({
                    message: "Error when creating PostTitle",
                    error: err,
                });
            }
            return res.status(201).json(PostTitle);
        });
    },

    /**
     * PostTitleController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PostTitleModel.findOne({ _id: id }, function (err, PostTitle) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting PostTitle",
                    error: err,
                });
            }
            if (!PostTitle) {
                return res.status(404).json({
                    message: "No such PostTitle",
                });
            }

            PostTitle.titleName = req.body.titleName
                ? req.body.titleName
                : PostTitle.titleName;

            PostTitle.save(function (err, PostTitle) {
                if (err) {
                    return res.status(500).json({
                        message: "Error when updating PostTitle.",
                        error: err,
                    });
                }

                return res.json(PostTitle);
            });
        });
    },

    /**
     * PostTitleController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PostTitleModel.findByIdAndRemove(id, function (err, PostTitle) {
            if (err) {
                return res.status(500).json({
                    message: "Error when deleting the PostTitle.",
                    error: err,
                });
            }
            return res.status(204).json();
        });
    },
};
