const express = require("express");
const multer  = require('multer');

const upload = multer();
const router = express.Router();

const controller = require("../../controllers/admin/products-category.controller");

const validates = require("../../validates/admin/products-categoty.validates");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
    "/create", 
    upload.single('thumbnail'),
    uploadCloud.upload,
    validates.createPostValidate,
    controller.createPost
);

 router.get("/edit/:id", controller.edit);

 router.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validates.createPostValidate,
    controller.editPatch
);

module.exports = router;