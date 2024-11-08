const { body, validationResult } = require("express-validator");
const Book = require("../models/pheasant");
const asyncHandler = require("express-async-handler");

// Display book create form on GET.
exports.pheasant_create_get = (req, res, next) => {
    res.render("pheasant_form", { title: "Submit Word" });;
  };
  
// Handle book create on POST.
exports.pheasant_create_post = [
  // Validate and sanitize the name field.
  body("word", "Word must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const pheasant = new Pheasant({ word: req.body.word });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("pheasant_form", {
        title: "Submit Word",
        word: pheasant,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const wordExists = await Pheasant.findOne({ word: req.body.word })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (wordExists) {
        // Genre exists, redirect to its detail page.
        res.redirect(wordExists.url);
      } else {
        await pheasant.save();
        // New genre saved. Redirect to genre detail page.
        res.redirect(pheasant.url);
      }
    }
  }),
];