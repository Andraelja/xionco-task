const prisma = require("../prisma/client");
const asyncHandler = require("../utils/validators/asyncHandler");
const { success, error } = require("../utils/validators/response");

const getStock = asyncHandler(async (req, res) => {
    const stock = await prisma.stockProduk.findMany({
        select: { id: true, produkId: true, jumlah: true },
        orderBy: { id: "desc" }
    });
    return success(res, "Berhasil mengambil data!", stock);
});

const createStock = asyncHandler(async (req, res) => {
    const { produkId, jumlah } = req.body;

    if(!produkId || !jumlah) {
        return error(res, "Produk dan jumlah wajib diisi!", 400)
    }

    const produk = await prisma.produk.findUnique({
        where: { id: Number(produkId) }
    });

    if(!produk) {
        return error(res, "Produk tidak ditemukan!", 404)
    }

    const stock = await prisma.stockProduk.create({
        data: { produkId: Number(produkId), jumlah: Number(jumlah) },
        include: { produk: true }
    });

    return success(res, "Berhasil menambahkan stok!", stock, 201)
});

const findStockById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const stock = await prisma.stockProduk.findUnique({
        where: { id: Number(id) },
        include: { produk: true }
    });

    if(!stock) return error(res, "Stok tidak ditemukan!", 404);

    return success(res, "Berhasil mengambil data!", stock, 200);
});

const updateStock = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { produkId, jumlah } = req.body;

    if(!produkId || !jumlah) {
        return error(res, "Produk dan jumlah wajib diisi!", 400)
    }

    const produk = await prisma.produk.findUnique({
        where: { id: Number(produkId) }
    });

    if(!produk) {
        return error(res, "Produk tidak ditemukan!", 404)
    }

    const cek = await prisma.stockProduk.findUnique({
        where: { id: Number(id) }
    });

    if(!cek) return error(res, "Stok tidak ditemukan!", 404);

    const stock = await prisma.stockProduk.update({
        where: { id: Number(id) },
        data: { produkId: Number(produkId), jumlah: Number(jumlah) },
        include: { produk: true }
    });

    return success(res, "Berhasil mengupdate data", stock, 200);
});

const deleteStock = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cek = await prisma.stockProduk.findUnique({
    where: { id: Number(id) },
  });

  if (!cek) return error(res, "Stock tidak ditemukan", 404);

  await prisma.stockProduk.delete({
    where: { id: Number(id) },
  });

  return success(res, "Berhasil menghapus stock", null);
});

module.exports = {
  getStock,
  createStock,
  findStockById,
  updateStock,
  deleteStock
};