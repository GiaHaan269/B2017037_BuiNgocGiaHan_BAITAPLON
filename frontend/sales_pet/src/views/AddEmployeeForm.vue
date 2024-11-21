<template>
    <div>
        <HeaderView />

        <div class="container mt-4">
            <button class="btn btn-primary mb-3" @click="showAddForm = !showAddForm">Thêm Nhân Viên</button>

            <!-- Form to add employee -->
            <div v-if="showAddForm">
                <form @submit.prevent="addEmployee">
                    <div class="mb-3">
                        <label for="MSNV" class="form-label">Mã Số Nhân Viên</label>
                        <input v-model="newEmployee.MSNV" type="text" id="MSNV" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label for="HoTenNV" class="form-label">Họ Tên</label>
                        <input v-model="newEmployee.HoTenNV" type="text" id="HoTenNV" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label for="ChucVu" class="form-label">Chức Vụ</label>
                        <input v-model="newEmployee.ChucVu" type="text" id="ChucVu" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label for="DiaChi" class="form-label">Địa Chỉ</label>
                        <input v-model="newEmployee.DiaChi" type="text" id="DiaChi" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label for="SoDienThoai" class="form-label">Số Điện Thoại</label>
                        <input v-model="newEmployee.SoDienThoai" type="text" id="SoDienThoai" class="form-control"
                            required />
                    </div>
                    <div class="mb-3">
                        <label for="Password" class="form-label">Mật Khẩu</label>
                        <input v-model="newEmployee.Password" type="password" id="Password" class="form-control" required />
                    </div>
                    <button type="submit" class="btn btn-success">Thêm Nhân Viên</button>
                    <button type="button" class="btn btn-secondary" @click="showAddForm = false">Hủy</button>
                </form>
            </div>

            <!-- Employees Table -->
            <table class="table table-striped mt-4" v-if="employees.length > 0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã Số</th>
                        <th>Họ Tên</th>
                        <th>Chức Vụ</th>
                        <th>Địa Chỉ</th>
                        <th>Số Điện Thoại</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(employee, index) in employees" :key="employee.MSNV">
                        <th>{{ index + 1 }}</th>
                        <td>{{ employee.MSNV }}</td>
                        <td>{{ employee.HoTenNV }}</td>
                        <td>{{ employee.ChucVu }}</td>
                        <td>{{ employee.DiaChi }}</td>
                        <td>{{ employee.SoDienThoai }}</td>
                        <td>
                            <button class="btn btn-danger" @click="deleteEmployee(employee._id)">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <FooterView />
    </div>
</template>

<script>
import axios from 'axios';
import HeaderView from '../components/HeaderView.vue';
import FooterView from '../components/FooterView.vue';

export default {
    components: {
        HeaderView,
        FooterView,
    },
    data() {
        return {
            employees: [],
            showAddForm: false,
            newEmployee: {
                MSNV: '',
                HoTenNV: '',
                ChucVu: '',
                DiaChi: '',
                SoDienThoai: '',
                Password: '',
            },
        };
    },
    methods: {
        // Fetch all employees
        fetchEmployees() {
            axios.get('http://localhost:3000/api/nhanvien')
                .then(response => {
                    this.employees = response.data;
                })
                .catch(error => console.log(error));
        },

        // Add new employee
        addEmployee() {
            axios.post('http://localhost:3000/api/nhanvien/add', this.newEmployee)
                .then(response => {
                    this.employees.push(response.data); // Add new employee to the list
                    this.showAddForm = false; // Hide the form
                    this.resetForm();
                })
                .catch(error => console.log(error));
        },

        // Reset the form
        resetForm() {
            this.newEmployee = {
                MSNV: '',
                HoTenNV: '',
                ChucVu: '',
                DiaChi: '',
                SoDienThoai: '',
                Password: '',
            };
        },

        // Delete employee
        deleteEmployee(id) {
            if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
                axios.delete(`http://localhost:3000/api/nhanvien/${id}`)
                    .then(() => {
                        this.fetchEmployees(); // Refresh the list after deletion
                        window.alert('Xóa nhân viên thành công!');
                    })
                    .catch(error => console.log(error));
            }
        }
    },
    created() {
        this.fetchEmployees();
    },
};
</script>

<style scoped>
.table {
    margin-top: 20px;
}

.mb-3 {
    margin-bottom: 15px;
}
</style>
