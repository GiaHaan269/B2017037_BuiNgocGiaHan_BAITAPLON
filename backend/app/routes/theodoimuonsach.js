const express = require('express');
const TheoDoiMuonSach = require('../models/TheoDoiMuonSach');
const router = express.Router();

// Thêm mới một thông tin mượn sách
router.post('/add', (req, res) => {
    const newTheoDoiMuonSach = new TheoDoiMuonSach(req.body);
    newTheoDoiMuonSach.save()
        .then(theodoi => res.json(theodoi))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Lấy tất cả thông tin theo dõi mượn sách
router.get('/', (req, res) => {
    TheoDoiMuonSach.find()
        .then(theodoi => res.json(theodoi))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Lấy thông tin mượn sách theo mã độc giả và mã sách
router.get('/:maDocGia/:maSach', (req, res) => {
    TheoDoiMuonSach.findOne({ MaDocGia: req.params.maDocGia, MaSach: req.params.maSach })
        .then(theodoi => res.json(theodoi))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Cập nhật thông tin mượn sách (ví dụ: ngày trả)
router.put('/:maDocGia/:maSach', (req, res) => {
    TheoDoiMuonSach.findOneAndUpdate({ MaDocGia: req.params.maDocGia, MaSach: req.params.maSach },
            req.body, { new: true }
        )
        .then(theodoi => res.json(theodoi))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Xóa một thông tin mượn sách
router.delete('/:id', (req, res) => {
    TheoDoiMuonSach.findByIdAndDelete(req.params.id)
        .then(() => res.json('Thông tin mượn sách đã được xóa'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;