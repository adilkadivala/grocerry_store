const dbConnect = require("../connect/connect");
const fs = require("fs");
const path = require("path");

// getting code
const getItem = async (req, res) => {
  try {
    const Que = "SELECT * FROM item";

    dbConnect.query(Que, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "internel server error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error);
  }
};

// insert item
const insertItem = async (req, res) => {
  try {
    const { item_title, item_weight, item_price } = req.body;
    const item_img = req.file ? req.file.filename : null;

    const Que =
      "INSERT INTO item (item_title, item_weight, item_price, item_img) VALUES(?,?,?,?)";
    const data = [item_title, item_weight, item_price, item_img];

    dbConnect.query(Que, data, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "internal server errro" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error);
  }
};

// updating item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { item_title, item_weight, item_price } = req.body;

    console.log(req.body);

    let item_img;

    if (req.file) {
      item_img = req.file.filename;
    } else {
      item_img = req.body.item_img || null;
    }

    const getImage = `SELECT item_img FROM item WHERE id = ?`;
    dbConnect.query(getImage, [id], (err, result) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "Internal server error while getting image" });
      }

      if (result.length > 0) {
        const oldImg = result[0].item_img;

        if (req.file && oldImg) {
          const oldImgPath = path.join(
            __dirname,
            "../../client/public/upload",
            oldImg
          );

          fs.access(oldImgPath, fs.constants.F_OK, (err) => {
            if (!err) {
              fs.unlink(oldImgPath, (err) => {
                if (err) {
                  console.error(`Error deleting old image: ${err.message}`);
                }
              });
            }
          });
        }

        const updateItem = `UPDATE item SET item_title = ?, item_weight = ?, item_price = ?, item_img = ? WHERE id = ?`;
        const data = [item_title, item_weight, item_price, item_img, id];

        console.log(data);

        dbConnect.query(updateItem, data, (err) => {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Internal server error" });
          }
          return res.sendStatus(200);
        });
      } else {
        return res.status(404).json({ message: "Item not found" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// deleting item
const deletItem = async (req, res) => {
  try {
    const { id } = req.params;
    const getimg = `SELECT item_img FROM item WHERE id = ?`;
    dbConnect.query(getimg, [id], (err, result) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "internel server error while getting an image" });
      }
      console.log(result);
      if (result.length > 0) {
        const item_img = result[0].item_img;

        const Que = `DELETE FROM item WHERE id = ?`;
        dbConnect.query(Que, [id], (err) => {
          if (err) {
            console.error(err.message);
            return res.status(500).json({
              message: "internel server error while deleting other data",
            });
          }

          const filePath = path.join(
            __dirname,
            "../../client/public/upload",
            item_img
          );

          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(err.message);
              return res.status(500).json({
                message: "internel server error while deleting image",
              });
            }

            return res.sendStatus(200);
          });
        });
      } else {
        return res.status(404).json({ message: "Record not found" });
      }
    });
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getItem,
  insertItem,
  updateItem,
  deletItem,
};
