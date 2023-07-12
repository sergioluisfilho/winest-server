import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";

// Configurar as credenciais do AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

// Criar uma instância do serviço S3
const s3 = new AWS.S3();

// Configurar o armazenamento com multer-s3
export const upload = multer({
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
