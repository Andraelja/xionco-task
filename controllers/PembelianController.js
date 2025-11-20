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
    orderBy: { id: "desc" },
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

module.exports = {
  getPembelian,
  createPembelian,
};
