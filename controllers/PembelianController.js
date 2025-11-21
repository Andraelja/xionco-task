const prisma = require("../prisma/client");
const asyncHandler = require("../utils/validators/asyncHandler");
const { success, error } = require("../utils/validators/response");

const getPembelian = asyncHandler(async (req, res) => {
  const pembelian = await prisma.pembelian.findMany({
    select: {
      id: true,
      produkId: true,
      jumlah: true,
      totalHarga: true,
      status: true,
    },
    orderBy: { id: "asc" },
  });
  return success(res, "Berhasil mengambil data!", pembelian);
});

const createPembelian = asyncHandler(async (req, res) => {
  const { produkId, jumlah } = req.body;

  if (!produkId || !jumlah) {
    return error(res, "Produk dan jumlah wajib diisi!", 400);
  }

  const produk = await prisma.produk.findUnique({
    where: { id: Number(produkId) },
  });

  if (!produk) return error(res, "Produk tidak ditemukan!", 404);

  const stok = await prisma.stockProduk.findUnique({
    where: { produkId: Number(produkId) },
  });

  if (!stok) return error(res, "Stok produk tidak ditemukan!", 404);

  if (stok.jumlah < jumlah) {
    return error(res, "Stok tidak mencukupi!", 400);
  }

  const totalHarga = produk.harga * jumlah;

  const pembelian = await prisma.pembelian.create({
    data: {
      produkId: Number(produkId),
      jumlah: Number(jumlah),
      totalHarga: Number(totalHarga),
    },
    include: { produk: true },
  });

  await prisma.stockProduk.update({
    where: { produkId: Number(produkId) },
    data: { jumlah: stok.jumlah - jumlah },
  });

  return success(res, "Pembelian berhasil dibuat!", pembelian, 201);
});

const findPembelianById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pembelian = await prisma.pembelian.findUnique({
    where: { id: Number(id) },
    include: { produk: true },
  });

  if (!pembelian) return error(res, "Pembelian tidak ditemukan!", 404);

  return success(res, "Berhasil mengambil data!", pembelian, 200);
});

const updatePembelian = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { produkId, jumlah } = req.body;

  if (!produkId || !jumlah) {
    return error(res, "Produk dan jumlah wajib diisi!", 400);
  }

  const pembelianLama = await prisma.pembelian.findUnique({
    where: { id: Number(id) },
  });

  if (!pembelianLama) {
    return error(res, "Pembelian tidak ditemukan!", 404);
  }

  const stokLama = await prisma.stockProduk.findUnique({
    where: { produkId: pembelianLama.produkId },
  });

  if (!stokLama) {
    return error(res, "Stok lama tidak ditemukan!", 404);
  }

  await prisma.stockProduk.update({
    where: { produkId: pembelianLama.produkId },
    data: { jumlah: stokLama.jumlah + pembelianLama.jumlah },
  });

  const produkBaru = await prisma.produk.findUnique({
    where: { id: Number(produkId) },
  });

  if (!produkBaru) {
    return error(res, "Produk baru tidak ditemukan!", 404);
  }

  const stokBaru = await prisma.stockProduk.findUnique({
    where: { produkId: Number(produkId) },
  });

  if (!stokBaru) {
    return error(res, "Stok produk baru tidak ditemukan!", 404);
  }

  if (stokBaru.jumlah < jumlah) {
    return error(res, "Stok baru tidak mencukupi!", 400);
  }

  const totalHargaBaru = produkBaru.harga * jumlah;

  const pembelianUpdate = await prisma.pembelian.update({
    where: { id: Number(id) },
    data: {
      produkId: Number(produkId),
      jumlah: Number(jumlah),
      totalHarga: Number(totalHargaBaru),
    },
    include: { produk: true },
  });

  await prisma.stockProduk.update({
    where: { produkId: Number(produkId) },
    data: { jumlah: stokBaru.jumlah - jumlah },
  });

  return success(res, "Pembelian berhasil diperbarui!", pembelianUpdate, 200);
});

const deletePembelian = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const pembelian = await prisma.pembelian.findUnique({
    where: { id: Number(id) },
  });

  if (!pembelian) {
    return error(res, "Pembelian tidak ditemukan!", 404);
  }

  const stok = await prisma.stockProduk.findUnique({
    where: { produkId: pembelian.produkId },
  });

  if (!stok) {
    return error(res, "Stok produk tidak ditemukan!", 404);
  }

  await prisma.stockProduk.update({
    where: { produkId: pembelian.produkId },
    data: {
      jumlah: stok.jumlah + pembelian.jumlah,
    },
  });

  await prisma.pembelian.delete({
    where: { id: Number(id) },
  });

  return success(
    res,
    "Pembelian berhasil dihapus & stok dikembalikan!",
    null,
    200
  );
});

module.exports = {
  getPembelian,
  createPembelian,
  findPembelianById,
  updatePembelian,
  deletePembelian,
};
