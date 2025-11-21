const prisma = require("../prisma/client");
const asyncHandler = require("../utils/validators/asyncHandler");
const { success, error } = require("../utils/validators/response");

const getProduk = asyncHandler(async (req, res) => {
  const produk = await prisma.produk.findMany({
    select: { id: true, nama: true, harga: true },
    orderBy: { id: "desc" },
  });

  return success(res, "Berhasil mengambil data", produk);
});

const createProduk = asyncHandler(async (req, res) => {
  const { nama, harga } = req.body;

  if (!nama || !harga) {
    return error(res, "Nama dan harga wajib diisi", 400);
  }

  const produk = await prisma.produk.create({
    data: { nama, harga: Number(harga) },
  });

  return success(res, "Berhasil menambahkan produk", produk, 201);
});

const findProdukById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const produk = await prisma.produk.findUnique({
    where: { id: Number(id) },
  });

  if (!produk) return error(res, "Produk tidak ditemukan", 404);

  return success(res, "Berhasil mengambil data", produk);
});

const updateProduk = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { nama, harga } = req.body;

  const cek = await prisma.produk.findUnique({
    where: { id: Number(id) },
  });

  if (!cek) return error(res, "Produk tidak ditemukan", 404);

  const produk = await prisma.produk.update({
    where: { id: Number(id) },
    data: { nama, harga: Number(harga) },
  });

  return success(res, "Berhasil mengupdate produk", produk);
});

const deleteProduk = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cek = await prisma.produk.findUnique({ where: { id: Number(id) } });
  if (!cek) return error(res, "Produk tidak ditemukan", 404);

  // Cek relasi StockProduk
  const relatedStock = await prisma.stockProduk.findFirst({
    where: { produkId: Number(id) },
  });

  // Cek relasi Pembelian
  const relatedPembelian = await prisma.pembelian.findFirst({
    where: { produkId: Number(id) },
  });

  if (relatedStock || relatedPembelian) {
    return error(
      res,
      "Produk masih dipakai di StockProduk atau Pembelian, tidak bisa dihapus",
      400
    );
  }

  await prisma.produk.delete({ where: { id: Number(id) } });

  return success(res, "Berhasil menghapus produk", null);
});


module.exports = {
  getProduk,
  createProduk,
  findProdukById,
  updateProduk,
  deleteProduk,
};
