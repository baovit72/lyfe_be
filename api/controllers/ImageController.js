const multer = require("multer");
const imgSteam = require("image-steam");

const { Image } = require("./../models/Image");

const ImageController = () => {
  const upload = multer({
    dest: "images/",
    onError: function (err, next) {
      next(err);
    },
    fileFilter: function (req, file, cb) {
      const allowedTypes = [
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/svg+xml",
      ];

      if (allowedTypes.indexOf(file.mimetype) === -1) {
        req.fileValidationError = "mimetype not allowed";
        return cb(null, false, new Error("mimetype not allowed"));
      }
      cb(null, true);
    },
  });
  const imageSteamConfig = {
    storage: {
      defaults: {
        driver: "fs",
        path: "./images",
      },
      cacheTTS: 86400 * 14,
      cacheOptimizedTTS: 86400 * 14,
      cacheArtifacts: true,
    },
    throttle: {
      ccProcessors: 4,
      ccPrefetchers: 20,
      ccRequests: 100,
    },
    log: {
      errors: false,
    },
  };
  const ImageServer = new imgSteam.http.Connect(imageSteamConfig);
  const imageHandler = ImageServer.getHandler();

  const uploadImageMW = upload.single("image");
  const uploadImage = async (req, res, next) => {
    try {
      if (!res.headerSent) {
        res.setHeader("Content-Type", "application/json");
      }
      const image = await Image.create({
        alt: "",
        filename: req.file.filename,
      });
      console.log("created image", image);
      res.send(
        JSON.stringify({
          url: "http://localhost:2021" + "/rest/image/" + req.file.filename,
        })
      );
    } catch (e) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  const getImage = async (req, res) => {
    console.log("get image");
    // console.log(req.url);
    req.url = req.url.replace("/image", "");
    imageHandler(req, res);
  };

  return {
    uploadImageMW,
    getImage,
    uploadImage,
  };
};

module.exports = ImageController;
