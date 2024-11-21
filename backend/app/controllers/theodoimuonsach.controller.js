const TheoDoiMuonSach = require('../models/TheoDoiMuonSach');

// Thêm mới một thông tin mượn sách
exports.createTheoDoiMuonSach = async(req, res) => {
    try {
        const newTheoDoiMuonSach = new TheoDoiMuonSach(req.body);
        const savedTheoDoi = await newTheoDoiMuonSach.save();
        res.json(savedTheoDoi);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi thêm thông tin mượn sách: ' + error.message });
    }
};

// Lấy tất cả thông tin theo dõi mượn sách
exports.getAllTheoDoiMuonSach = async(req, res) => {
    try {
        const theoDoiList = await TheoDoiMuonSach.find();
        res.json(theoDoiList);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi lấy danh sách theo dõi mượn sách: ' + error.message });
    }
};

// Lấy thông tin mượn sách theo mã độc giả và mã sách
exports.getTheoDoiMuonSachById = async(req, res) => {
    const { maDocGia, maSach } = req.params;
    try {
        const theoDoi = await TheoDoiMuonSach.findOne({ MaDocGia: maDocGia, MaSach: maSach });
        if (!theoDoi) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin mượn sách!' });
        }
        res.json(theoDoi);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi lấy thông tin mượn sách: ' + error.message });
    }
};

// Cập nhật thông tin mượn sách (ví dụ: cập nhật ngày trả)
exports.updateTheoDoiMuonSach = async(req, res) => {
    const { maDocGia, maSach } = req.params;
    try {
        const updatedTheoDoi = await TheoDoiMuonSach.findByIdAndDelete(req.params.id);
        if (!updatedTheoDoi) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin mượn sách để cập nhật!' });
        }
        res.json(updatedTheoDoi);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi cập nhật thông tin mượn sách: ' + error.message });
    }
};

// Xóa một thông tin mượn sách
exports.deleteTheoDoiMuonSach = async(req, res) => {
    const { maDocGia, maSach } = req.params;
    try {
        const deletedTheoDoi = await TheoDoiMuonSach.findOneAndDelete({ MaDocGia: maDocGia, MaSach: maSach });
        if (!deletedTheoDoi) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin mượn sách để xóa!' });
        }
        res.json({ message: 'Thông tin mượn sách đã được xóa thành công!' });
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi xóa thông tin mượn sách: ' + error.message });
    }
};