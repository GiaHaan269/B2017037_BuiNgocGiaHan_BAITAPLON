<template>
    <HeaderView />
    <div class="publisher-view container">

        <div class="row">
            <div class="col-12 mb-3">
                <button class="btn btn-primary" @click="showAddPublisherForm = !showAddPublisherForm">
                    Thêm Nhà Xuất Bản Mới
                </button>
            </div>

            <!-- Form thêm nhà xuất bản -->
            <div v-if="showAddPublisherForm" class="col-12">
                <form @submit.prevent="addPublisher">
                    <div class="mb-3">
                        <label for="publisherName" class="form-label">Tên Nhà Xuất Bản</label>
                        <input v-model="newPublisher.TenNXB" type="text" class="form-control" id="publisherName" required>
                    </div>
                    <div class="mb-3">
                        <label for="publisherCode" class="form-label">Mã Nhà Xuất Bản</label>
                        <input v-model="newPublisher.MaNXB" type="text" class="form-control" id="publisherCode" required>
                    </div>
                    <div class="mb-3">
                            <label for="publisherCode" class="form-label">Địa Chỉ</label>
                            <input v-model="newPublisher.DiaChi" type="text" class="form-control" id="publisherCode" required>
                        </div>
                    <button type="submit" class="btn btn-success">Thêm Nhà Xuất Bản</button>
                    <button type="button" class="btn btn-secondary ml-2" @click="showAddPublisherForm = false">Hủy</button>
                </form>
            </div>

            <!-- Bảng danh sách nhà xuất bản -->
            <div class="col-12 mt-4" v-if="publishers.length > 0">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên Nhà Xuất Bản</th>
                            <th>Mã Nhà Xuất Bản</th>
                            <th>Địa Chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(publisher, index) in publishers" :key="publisher.MaNXB">
                            <th>{{ index + 1 }}</th>
                            <td>{{ publisher.TenNXB }}</td>
                            <td>{{ publisher.MaNXB }}</td>
                            <td>{{ publisher.DiaChi}}</td>
                            <td>
                                <button class="btn btn-danger" @click="deletePublisher(publisher._id)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p>Chưa có nhà xuất bản nào.</p>
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
            publishers: [],  // Dữ liệu nhà xuất bản
            showAddPublisherForm: false,  // Hiển thị form thêm nhà xuất bản
            newPublisher: {  // Dữ liệu nhà xuất bản mới
                MaNXB: '',  // Publisher code
                TenNXB: ''  // Publisher name
            }
        };
    },
    methods: {
        // Lấy danh sách nhà xuất bản từ API
        fetchPublishers() {
            axios.get('http://localhost:3000/api/nhaxuatban')
                .then(res => {
                    this.publishers = res.data;
                })
                .catch(err => console.error("Lỗi khi lấy dữ liệu nhà xuất bản:", err));
        },

        // Thêm nhà xuất bản mới
        addPublisher() {
            if (!this.newPublisher.MaNXB || !this.newPublisher.TenNXB) {
                window.alert("Vui lòng nhập đầy đủ thông tin nhà xuất bản.");
                return;
            }

            axios.post('http://localhost:3000/api/nhaxuatban/add', this.newPublisher)
                .then(res => {
                        window.alert('Thêm nhà xuất bản thành công!');
                        this.showAddPublisherForm = false;  // Ẩn form sau khi thêm
                        this.fetchPublishers();  // Lấy lại danh sách nhà xuất bản
                        this.newPublisher = { MaNXB: '', TenNXB: '' };  // Làm sạch form             
                })
                .catch(err => {
                    console.error("Lỗi khi gửi yêu cầu:", err.response?.data || err.message);
                    
                });
        },

        // Xóa nhà xuất bản
        deletePublisher(Publisher) {
            if (window.confirm('Bạn có chắc chắn muốn xóa nhà xuất bản này?')) {
                axios.delete(`http://localhost:3000/api/nhaxuatban/${Publisher}`)
                    .then(res => {
                        window.alert('Xóa nhà xuất bản thành công!');
                        this.fetchPublishers();  // Lấy lại danh sách nhà xuất bản
                    })
                    .catch(err => {
                        console.error('Lỗi khi gửi yêu cầu xóa nhà xuất bản:', err.response?.data || err.message);
                    });
            }
        }
    },
    created() {
        this.fetchPublishers();  // Lấy danh sách nhà xuất bản khi component được tạo
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
