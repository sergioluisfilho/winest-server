import { Router, response } from "express";
import RegisterController from "./controllers/RegisterController";
import LoginController from "./controllers/LoginController";
import PostController from "./controllers/PostController";
import { authorize } from "./middlewares/authorize";
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";

const routes = Router();
const AWS = require("aws-sdk");

// Configurar as credenciais do AWS SDK
AWS.config.update({
  accessKeyId: "AKIAUNLJMN4CYLVLXKEX",
  secretAccessKey: "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",
  region: "us-east-2",
});

// Criar uma instância do serviço S3
const s3 = new AWS.S3();

// Configurar o armazenamento com multer-s3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "winestimages",
    acl: "public-read", // Permissões do objeto no bucket
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname); // Nome do arquivo no bucket
    },
  }),
});

routes.post("/register", RegisterController.create);
routes.post("/login", LoginController.auth);

routes.post("/posts", authorize, PostController.create);
routes.get("/posts", authorize, PostController.show);
routes.post("/posts/:id/like", authorize, PostController.like);

routes.get("/", authorize, (req, res) => {
  console.log("ok");
  return res.send("Connected");
});

routes.post("/upload", upload.single("image"), async (req, res) => {
  return res.send();
});

export default routes;
