const NhaXuatBan = require('../models/NhaXuatBan');

// Thêm mới một nhà xuất bản
exports.createNhaXuatBan = async(req, res) => {
    try {
        const newNhaXuatBan = new NhaXuatBan(req.body);
        const savedNhaXuatBan = await newNhaXuatBan.save();
        res.json(savedNhaXuatBan);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi thêm nhà xuất bản: ' + error.message });
    }
};

// Lấy tất cả nhà xuất bản
exports.getAllNhaXuatBan = async(req, res) => {
    try {
        const nhaXuatBanList = await NhaXuatBan.find();
        res.json(nhaXuatBanList);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi lấy danh sách nhà xuất bản: ' + error.message });
    }
};

// Lấy thông tin nhà xuất bản theo mã nhà xuất bản
exports.getNhaXuatBanById = async(req, res) => {
    try {
        const nhaXuatBan = await NhaXuatBan.findById(req.params.id);
        if (!nhaXuatBan) {
            return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản!' });
        }
        res.json(nhaXuatBan);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi lấy thông tin nhà xuất bản: ' + error.message });
    }
};

// Cập nhật thông tin nhà xuất bản
exports.updateNhaXuatBan = async(req, res) => {
    try {
        const updatedNhaXuatBan = await NhaXuatBan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNhaXuatBan) {
            return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản để cập nhật!' });
        }
        res.json(updatedNhaXuatBan);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi cập nhật nhà xuất bản: ' + error.message });
    }
};

// Xóa một nhà xuất bản
exports.deleteNhaXuatBan = async(req, res) => {
    try {
        const deletedNhaXuatBan = await NhaXuatBan.findByIdAndDelete(req.params.id);
        if (!deletedNhaXuatBan) {
            return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản để xóa!' });
        }
        res.json({ message: 'Nhà xuất bản đã được xóa thành công!' });
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi xóa nhà xuất bản: ' + error.message });
    }
};