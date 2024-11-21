<template>
    <HeaderView />
    <div class="publisher-view container">
        <div class="row">
            <div class="col-12 mb-3">
                <button class="btn btn-primary" @click="showAddDocGiaForm = !showAddDocGiaForm">
                    Thêm Độc Giả Mới
                </button>
            </div>

            <!-- Form thêm độc giả -->
            <div v-if="showAddDocGiaForm" class="col-12">
                <form @submit.prevent="addDocGia">
                    <div class="mb-3">
                        <label for="maDocGia" class="form-label">Mã Độc Giả</label>
                        <input v-model="newDocGia.MaDocGia" type="text" class="form-control" id="maDocGia" required>
                    </div>
                    <div class="mb-3">
                        <label for="hoLot" class="form-label">Họ </label>
                        <input v-model="newDocGia.HoLot" type="text" class="form-control" id="hoLot" required>
                    </div>
                    <div class="mb-3">
                        <label for="ten" class="form-label">Tên</label>
                        <input v-model="newDocGia.Ten" type="text" class="form-control" id="ten" required>
                    </div>
                    <div class="mb-3">
                        <label for="ngaySinh" class="form-label">Ngày Sinh</label>
                        <input v-model="newDocGia.NgaySinh" type="date" class="form-control" id="ngaySinh" required>
                    </div>
                    <div class="mb-3">
                        <label for="phai" class="form-label">Phái</label>
                        <input v-model="newDocGia.Phai" type="text" class="form-control" id="phai" required>
                    </div>
                    <div class="mb-3">
                        <label for="diaChi" class="form-label">Địa Chỉ</label>
                        <input v-model="newDocGia.DiaChi" type="text" class="form-control" id="diaChi" required>
                    </div>
                    <div class="mb-3">
                        <label for="dienThoai" class="form-label">Điện Thoại</label>
                        <input v-model="newDocGia.DienThoai" type="text" class="form-control" id="dienThoai" required>
                    </div>
                    <button type="submit" class="btn btn-success">Thêm Độc Giả</button>
                    <button type="button" class="btn btn-secondary ml-2" @click="showAddDocGiaForm = false">Hủy</button>
                </form>
            </div>

            <!-- Bảng danh sách độc giả -->
            <div class="col-12 mt-4" v-if="docGias.length > 0">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã Độc Giả</th>
                            <th>Họ </th>
                            <th>Tên</th>
                            <th>Ngày Sinh</th>
                            <th>Phái</th>
                            <th>Địa Chỉ</th>
                            <th>Điện Thoại</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(docGia, index) in docGias" :key="docGia.MaDocGia">
                            <th>{{ index + 1 }}</th>
                            <td>{{ docGia.MaDocGia }}</td>
                            <td>{{ docGia.HoLot }}</td>
                            <td>{{ docGia.Ten }}</td>
                            <td>{{ docGia.NgaySinh }}</td>
                            <td>{{ docGia.Phai }}</td>
                            <td>{{ docGia.DiaChi }}</td>
                            <td>{{ docGia.DienThoai }}</td>
                            <td>
                                <button class="btn btn-danger" @click="deleteDocGia(docGia.MaDocGia)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p>Chưa có độc giả nào.</p>
            </div>
        </div>
    </div>
    <FooterView />
</template>

<script>
import axios from 'axios';
import HeaderView from '../components/HeaderView.vue';
import FooterView from '../components/FooterView.vue';

export default {
    components: {
        HeaderView,
        FooterView
    },
    data() {
        return {
            docGias: [],  // Dữ liệu độc giả
            showAddDocGiaForm: false,  // Hiển thị form thêm độc giả
            newDocGia: {  // Dữ liệu độc giả mới
                MaDocGia: '',  // ID của độc giả
                HoLot: '',  // Họ lót của độc giả
                Ten: '',  // Tên của độc giả
                NgaySinh: '',  // Ngày sinh của độc giả
                Phai: '',  // Phái của độc giả
                DiaChi: '',  // Địa chỉ của độc giả
                DienThoai: ''  // Số điện thoại của độc giả
            }
        };
    },
    methods: {
        // Lấy danh sách độc giả từ API
        fetchDocGias() {
            axios.get('http://localhost:3000/api/docgia')
                .then(res => {
                    this.docGias = res.data;
                })
                .catch(err => console.error("Lỗi khi lấy dữ liệu độc giả:", err));
        },

        // Thêm độc giả mới
        addDocGia() {
            if (!this.newDocGia.MaDocGia || !this.newDocGia.HoLot || !this.newDocGia.Ten ||
                !this.newDocGia.NgaySinh || !this.newDocGia.Phai || !this.newDocGia.DiaChi || !this.newDocGia.DienThoai) {
                window.alert("Vui lòng nhập đầy đủ thông tin độc giả.");
                return;
            }

            axios.post('http://localhost:3000/api/docgia/add', this.newDocGia)
                .then(res => {
                    
                        window.alert('Thêm độc giả thành công!');
                        this.showAddDocGiaForm = false;  // Ẩn form sau khi thêm
                        this.fetchDocGias();  // Lấy lại danh sách độc giả
                        this.newDocGia = { MaDocGia: '', HoLot: '', Ten: '', NgaySinh: '', Phai: '', DiaChi: '', DienThoai: '' };  // Làm sạch form
                    
                })
                .catch(err => {
                    console.error("Lỗi khi gửi yêu cầu:", err.response?.data || err.message);
                    window.alert("Thêm độc giả thất bại.");
                });
        },

        // Xóa độc giả
        deleteDocGia(maDocGia) {
            if (window.confirm('Bạn có chắc chắn muốn xóa độc giả này?')) {
                axios.delete(`http://localhost:3000/api/docgia/${maDocGia}`)
                    .then(res => {
                        window.alert('Xóa độc giả thành công!');
                        this.fetchDocGias();  // Lấy lại danh sách độc giả
                    })
                    .catch(err => {
                        console.error('Lỗi khi gửi yêu cầu xóa độc giả:', err.response?.data || err.message);
                        window.alert('Xóa độc giả thất bại!');
                    });
            }
        }
    },
    created() {
        this.fetchDocGias();  // Lấy danh sách độc giả khi component được tạo
    }
};
</script>

<style scoped>
.publisher-view {
    margin: 16px auto;
}

.table {
    margin-top: 20px;
}

.form-label {
    font-weight: bold;
}

.mb-3 {
    margin-bottom: 15px;
}
</style>
