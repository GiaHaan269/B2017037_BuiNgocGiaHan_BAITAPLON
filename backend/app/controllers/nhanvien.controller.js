const NhanVien = require('../models/NhanVien');

// Thêm mới một nhân viên
exports.createNhanVien = async(req, res) => {
    try {
        const newNhanVien = new NhanVien(req.body);
        const savedNhanVien = await newNhanVien.save();
        res.json(savedNhanVien);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi thêm nhân viên: ' + error.message });
    }
};

// Lấy tất cả nhân viên
exports.getAllNhanVien = async(req, res) => {
    try {
        const nhanVienList = await NhanVien.find();
        res.json(nhanVienList);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi lấy danh sách nhân viên: ' + error.message });
    }
};

// Lấy thông tin nhân viên theo mã nhân viên
exports.getNhanVienById = async(req, res) => {
    try {
        const nhanVien = await NhanVien.findById(req.params.id);
        if (!nhanVien) {
            return res.status(404).json({ message: 'Không tìm thấy nhân viên!' });
        }
        res.json(nhanVien);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi lấy thông tin nhân viên: ' + error.message });
    }
};

// Cập nhật thông tin nhân viên
exports.updateNhanVien = async(req, res) => {
    try {
        const updatedNhanVien = await NhanVien.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNhanVien) {
            return res.status(404).json({ message: 'Không tìm thấy nhân viên để cập nhật!' });
        }
        res.json(updatedNhanVien);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi cập nhật nhân viên: ' + error.message });
    }
};

// Xóa một nhân viên
exports.deleteNhanVien = async(req, res) => {
    try {
        const deletedNhanVien = await NhanVien.findByIdAndDelete(req.params.id);
        if (!deletedNhanVien) {
            return res.status(404).json({ message: 'Không tìm thấy nhân viên để xóa!' });
        }
        res.json({ message: 'Nhân viên đã được xóa thành công!' });
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi xóa nhân viên: ' + error.message });
    }
};