const Sach = require('../models/Sach');

// Thêm mới một sách
exports.createSach = async(req, res) => {
    try {
        const newSach = new Sach(req.body);

        // Kiểm tra trường bắt buộc (có thể thêm các trường khác nếu cần)
        if (!newSach.MaSach || !newSach.TenSach || !newSach.TacGia) {
            return res.status(400).json({ error: "Các trường MaSach, TenSach, TacGia là bắt buộc." });
        }

        const savedSach = await newSach.save();
        res.status(201).json(savedSach); // Đảm bảo trả về mã trạng thái 201 cho tạo mới thành công
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi thêm sách: ' + error.message });
    }
};


// Lấy danh sách tất cả sách
exports.getAllSach = async(req, res) => {
    try {
        const sachList = await Sach.find();
        res.json(sachList);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi lấy danh sách sách: ' + error.message });
    }
};

// Lấy thông tin một sách theo mã sách
exports.getSachById = async(req, res) => {
    try {
        const sach = await Sach.findById(req.params.id);
        if (!sach) {
            return res.status(404).json({ message: 'Sách không tồn tại!' });
        }
        res.json(sach);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi lấy thông tin sách: ' + error.message });
    }
};

// Cập nhật thông tin sách
exports.updateSach = async(req, res) => {
    try {
        const updatedSach = await Sach.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSach) {
            return res.status(404).json({ message: 'Sách không tồn tại!' });
        }
        res.json(updatedSach);
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi cập nhật sách: ' + error.message });
    }
};


// Xóa một sách theo mã sách
exports.deleteSach = async(req, res) => {
    try {
        const deletedSach = await Sach.findByIdAndDelete(req.params.id);
        if (!deletedSach) {
            return res.status(404).json({ message: 'Sách không tồn tại!' });
        }
        res.json({ message: 'Sách đã được xóa thành công!' });
    } catch (error) {
        res.status(400).json({ error: 'Lỗi khi xóa sách: ' + error.message });
    }
};