const mongoose = require('mongoose');

const theoDoiMuonSachSchema = new mongoose.Schema({
    MaDocGia: { type: String, required: true, ref: 'Docgia' },
    MaSach: { type: String, required: true, ref: 'Sach' },
    NgayMuon: { type: Date, required: true },
    NgayTra: { type: Date },
});

module.exports = mongoose.model('TheoDoiMuonSach', theoDoiMuonSachSchema);
