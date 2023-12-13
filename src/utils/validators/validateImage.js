const resizeImage = require("../formats/resizeImage");
const slugFn = require("../formats/slug");

const validateImage = async (file) => {
  const { fieldname, originalname, mimetype, buffer } = file;
  if (!fieldname | !originalname | !mimetype | !buffer) {
    return "Arquivo de imagem inválido";
  }

  const imageResize = await resizeImage(buffer);
  if (typeof imageResize === "string") {
    return imageResize;
  }
  const slug = slugFn(Buffer.from(originalname, "ascii").toString("utf8"));

  return {
    fieldname,
    mimetype,
    originalname: slug,
    buffer: imageResize,
  };
};

module.exports = validateImage;
