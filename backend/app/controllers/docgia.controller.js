const Docgia = require('../models/Docgia');

// Thêm mới độc giả
exports.createDocgia = async(req, res) => {
    try {
        const newDocgia = new Docgia(req.body);
        const savedDocgia = await newDocgia.save();
        res.json(savedDocgia);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi thêm độc giả: ' + error.message });
    }
};

// Xóa độc giả theo MaDocGia
exports.deleteDocgia = async(req, res) => {
    const maDocGia = req.params.id;

    try {
        const deletedDocgia = await Docgia.findOneAndDelete({ MaDocGia: maDocGia });
        if (!deletedDocgia) {
            return res.status(404).json({ message: 'Độc giả không tồn tại!' });
        }
        res.json({ message: 'Độc giả đã bị xóa thành công!' });
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi xóa độc giả: ' + error.message });
    }
};

// Lấy danh sách tất cả độc giả
exports.getAllDocgia = async(req, res) => {
    try {
        const docgiaList = await Docgia.find();
        res.json(docgiaList);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi lấy danh sách độc giả: ' + error.message });
    }
};