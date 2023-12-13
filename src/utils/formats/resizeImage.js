const sharp = require("sharp");

const resizeImage = async (buffer, maxHeight = 800, maxWidth = 800) => {
  return new Promise((resolve, reject) => {
    sharp(buffer)
      .metadata()
      .then((metadata) => {
        const widthResize =
          metadata.width > maxWidth ? maxWidth : metadata.width;
        const heightResize =
          metadata.height > maxHeight ? maxHeight : metadata.height;

        if (metadata.width > maxWidth || metadata.height > maxHeight) {
          sharp(buffer)
            .resize(widthResize, heightResize)
            .toBuffer()
            .then((resizeBuffer) => {
              resolve(resizeBuffer);
            })
            .catch(() => {
              reject("Erro ao redimensionar imagem");
            });
        } else {
          resolve(buffer);
        }
      })
      .catch(() => {
        reject("Erro ao processar a imagem");
      });
  });
};

module.exports = resizeImage;
