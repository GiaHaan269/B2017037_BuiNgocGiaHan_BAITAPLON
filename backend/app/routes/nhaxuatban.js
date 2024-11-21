const express = require('express');
const NhaXuatBan = require('../models/NhaXuatBan');
const router = express.Router();

// Thêm mới một nhà xuất bản
router.post('/add', (req, res) => {
    const newNhaXuatBan = new NhaXuatBan(req.body);
    newNhaXuatBan.save()
        .then(nhaxuatban => res.json(nhaxuatban))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Lấy tất cả nhà xuất bản
router.get('/', (req, res) => {
    NhaXuatBan.find()
        .then(nhaxuatban => res.json(nhaxuatban))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Lấy một nhà xuất bản theo mã nhà xuất bản
router.get('/:id', (req, res) => {
    NhaXuatBan.findById(req.params.id)
        .then(nhaxuatban => res.json(nhaxuatban))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Cập nhật thông tin nhà xuất bản
router.put('/:id', (req, res) => {
    NhaXuatBan.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(nhaxuatban => res.json(nhaxuatban))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Xóa một nhà xuất bản
router.delete('/:id', (req, res) => {
    NhaXuatBan.findByIdAndDelete(req.params.id)
        .then(() => res.json('Nhà xuất bản đã được xóa'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;