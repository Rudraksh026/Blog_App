const express = require("express");
const auth = require("../auth-controller/controller")
const { upload } = require("../auth-middleware/multer");

const router = express.Router();

router.get("/",auth.home)
router.post("/login",auth.login)
router.post("/signup",auth.signup)
router.post("/addblog",upload.single("coverImage"),auth.addBlog)
router.get("/getBlog",auth.getBlog)
router.get("/blogs/:blogId", auth.getBlogById);

module.exports = router