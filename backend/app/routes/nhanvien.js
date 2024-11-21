const express = require('express');
const NhanVien = require('../models/NhanVien');
const router = express.Router();

// Thêm mới một nhân viên
router.post('/add', (req, res) => {
    const newNhanVien = new NhanVien(req.body);
    newNhanVien.save()
        .then(nhanvien => res.json(nhanvien))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Lấy tất cả nhân viên
router.get('/', (req, res) => {
    NhanVien.find()
        .then(nhanvien => res.json(nhanvien))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Lấy thông tin nhân viên theo mã nhân viên
router.get('/:id', (req, res) => {
    NhanVien.findById(req.params.id)
        .then(nhanvien => res.json(nhanvien))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Cập nhật thông tin nhân viên
router.put('/:id', (req, res) => {
    NhanVien.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(nhanvien => res.json(nhanvien))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Xóa một nhân viên
router.delete('/:id', (req, res) => {
    NhanVien.findByIdAndDelete(req.params.id)
        .then(() => res.json('Nhân viên đã được xóa'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;