const mongoose = require('mongoose');

const sachSchema = new mongoose.Schema({
    MaSach: { type: String, required: true, unique: true },
    TenSach: { type: String, required: true },
    DonGia: { type: Number, required: true },
    SoQuyen: { type: Number, required: true },
    NamXuatBan: { type: Number, required: true },
    MaNXB: { type: String, required: true, ref: 'NhaXuatBan' },
    TacGia: { type: String },
});

module.exports = mongoose.model('Sach', sachSchema);
