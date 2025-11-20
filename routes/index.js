const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

const registerController = require("../controllers/RegisterController");
const loginController = require("../controllers/LoginController");
const produkController = require("../controllers/ProdukController");
const stockController = require("../controllers/StockController");
const pembelianController = require("../controllers/PembelianController");

const { validateRegister, validateLogin } = require("../utils/validators/auth");
const { validateUser } = require('../utils/validators/user')

router.post("/register", validateRegister, registerController.register);
router.post("/login", validateLogin, loginController.login);

// produk
router.get("/produk", verifyToken, produkController.getProduk);
router.post("/produk", verifyToken, produkController.createProduk);
router.get("/produk/:id", verifyToken, produkController.findProdukById);
router.put("/produk/:id", verifyToken, produkController.updateProduk);
router.delete("/produk/:id", verifyToken, produkController.deleteProduk);

// stok
router.get("/stock", verifyToken, stockController.getStock);
router.post("/stock", verifyToken, stockController.createStock);
router.get("/stock/:id", verifyToken, stockController.findStockById);
router.put("/stock/:id", verifyToken, stockController.updateStock);
router.delete("/stock/:id", verifyToken, stockController.deleteStock);

// pembelian
router.get("/pembelian", verifyToken, pembelianController.getPembelian);
router.post("/pembelian", verifyToken, pembelianController.createPembelian);
// router.get("/pembelian/:id", verifyToken, pembelianController.findStockById);
// router.put("/pembelian/:id", verifyToken, pembelianController.updateStock);
// router.delete("/pembelian/:id", verifyToken, pembelianController.deleteStock);

module.exports = router;
