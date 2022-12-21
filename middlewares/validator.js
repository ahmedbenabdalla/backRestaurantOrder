const express = require("express");
const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("firstName", "This field is required").notEmpty(),
  check("lastName", "this field is required").notEmpty(),
  check("email", "this field should be a valid email").isEmail(),
  check("role", "This field is required").notEmpty(),
  check("password", "This field should be at least 6 characters").isLength({
    min: 6,
  }),
];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  return errors.isEmpty()
    ? next()
    : res.status(400).json({ errors: errors.array() });
};
