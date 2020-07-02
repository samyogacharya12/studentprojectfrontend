<template>
    <div>
        <div id="wrapper">

            <!-- Sidebar -->
            <sidebar/>
            <!-- End of Sidebar -->

            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">

                <!-- Main Content -->
                <div id="content">

                    <div class="app-container">
                        <div class="filter-container">
                            <el-button @click="handleCreate"   type="primary">
                                Add
                            </el-button>
                            &nbsp;
                            <el-input
                                    v-model="filterText"
                                    placeholder="Search"
                                    style="width: 20%"
                                    prefix-icon="el-icon-search"
                                    @keyup.native="filterTable"
                            />

                        </div>
                        <div>
                            <el-table
                                    ref="tableRef"
                                    :data="list"
                                    v-loading="loading"
                                    element-loading-text="Loading..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.1);"
                                    style="width: 100%"
                                    border
                                    fit
                                    highlight-current-row
                            >

                                <el-table-column
                                        v-for="column in columns"
                                        :key="column.label"
                                        :prop="column.prop"
                                        align="center"
                                        :label="column.label"
                                        :sortable="column.sortable"
                                        :formatter="column.formatter"
                                        :min-width="column.minWidth"
                                />
                                <el-table-column label="Actions" width="85px" >
                                    <template slot-scope="{row}">
                                        <el-button type="primary" size="mini" @click="handleUpdate(row.id)">
                                            Edit
                                        </el-button>
                                    </template>
                                </el-table-column>

                            </el-table>
                            <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo"
                                        :limit.sync="listQuery.pageSize" @pagination="getListOfStudent"/>

                            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
                                <el-card shadow="never">
                                    <el-form ref="dataForm" :model="studentDetailDto" :rules="rules"
                                             label-width="190px">
                                        <el-form-item label="First Name" prop="firstName">
                                            <el-input v-model="studentDetailDto.firstName" type="text"
                                                      placeholder="Enter First Name"/>
                                        </el-form-item>

                                        <el-form-item label="Middle Name">
                                            <el-input v-model="studentDetailDto.middleName" type="text"
                                                      placeholder="Enter Middle Name"/>
                                        </el-form-item>

                                        <el-form-item label="Last Name" prop="lastName">
                                            <el-input v-model="studentDetailDto.lastName" type="text"
                                                      placeholder="Enter Last Name"/>
                                        </el-form-item>

                                        <el-form-item label="Email" prop="email">
                                            <el-input v-model="studentDetailDto.email" type="email"
                                                      placeholder="Enter Email"/>
                                        </el-form-item>

                                        <el-form-item label="Mobile Number" prop="mobileNumber">
                                            <el-input v-model="studentDetailDto.mobileNumber" type="number"
                                                      placeholder="Enter Mobile number"/>
                                        </el-form-item>


                                        <el-form-item label="Date of Birth" prop="dateOfBirth">
                                            <el-date-picker type="datetime" format="yyyy-MM-dd hh:mm:ss A" value-format="yyyy-MM-ddThh:mm:ss" v-model="studentDetailDto.dateOfBirth" placeholder="Select date and time"></el-date-picker>
                                        </el-form-item>

                                        <el-form-item label="Joined Date" prop="joinedDate">
                                            <el-date-picker type="datetime" format="yyyy-MM-dd hh:mm:ss A" value-format="yyyy-MM-ddThh:mm:ss" v-model="studentDetailDto.joinedDate" placeholder="Select date and time"></el-date-picker>
                                        </el-form-item>

                                        <el-form-item label="Temporary Address" prop="temporaryAddress">
                                            <el-input v-model="studentDetailDto.temporaryAddress" type="text"
                                                      placeholder="Enter Temporary Address"/>
                                        </el-form-item>


                                        <el-form-item label="Permanent Address" prop="permanentAddress">
                                            <el-input v-model="studentDetailDto.permanentAddress" type="text"
                                                      placeholder="Enter Permanent Address"/>
                                        </el-form-item>

                                        <el-form-item label="Guardian Name" prop="guardianName">
                                            <el-input v-model="studentDetailDto.guardianName" type="text"
                                                      placeholder="Enter Guardian Name"/>
                                        </el-form-item>

                                        <el-form-item label="Guardian Phone Number" prop="guardianName">
                                            <el-input v-model="studentDetailDto.guardianPhoneNumber" type="number"
                                                      placeholder="Enter Guardian Phone Number"/>
                                        </el-form-item>


                                        <el-form-item label="Previous Degree" prop="previousDegree">
                                            <el-input v-model="studentDetailDto.previousDegree" type="text"
                                                      placeholder="Enter Previous Degree"/>
                                        </el-form-item>

                                        <el-form-item label="Previous School" prop="previousSchool">
                                            <el-input v-model="studentDetailDto.previousSchool" type="text"
                                                      placeholder="Enter Previous School"/>
                                        </el-form-item>

                                        <el-form-item  label="Semester"  prop="semesterId">
                                            <el-select v-model="studentDetailDto.semesterId">
                                            <div v-for="data in listSemester">
                                                <el-option v-bind:value="data.id">
                                                    {{data.semesterName}}
                                                </el-option>
                                            </div>
                                            </el-select>
                                        </el-form-item>


                                        <el-form-item>
                                                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                                                <el-button type="primary" @click="dialogStatus==='create'?saveStudentDetail(studentDetailDto):updateStudentDetail(studentDetailDto)">Confirm</el-button>
                                            </el-form-item>

                                    </el-form>
                                </el-card>
                            </el-dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../api/student-api'
     import semesterapi from '../../api/semester-api'
    import sidebar from "../../layout/components/sidebar";
    import Pagination from "../../layout/components/pagination"
    export default {
        name: "index",
        components:{sidebar, Pagination},
        data() {
            return {
                columns:[  {label: 'Id', prop: 'id', sortable: true, minWidth: 80},
                    {label:'Created Date', prop:'created', sortable:true, minWidth:80},
                    {label:'First Name', prop:'firstName', sortable:true, minWidth:80},
                    {label:'Middle Name', prop:'middleName', sortable:true, minWidth:80},
                    {label:'Last Name', prop:'lastName', sortable:true, minWidth:80},
                    {label:'Email', prop:'email', sortable:true, minWidth:80},
                    {label:'Section Name', prop:'semesterDto.sectionName', sortable:true, minWidth:80},
                    {label:'Semester Name', prop:'semesterDto.semesterName', sortable:true, minWidth:80}
                    ],
                studentDetailDto:{semesterId:'',firstName:'', middleName:'', lastName:'', email:'',mobileNumber:'', dateOfBirth:'', joinedDate:'', temporaryAddress:'', permanentAddress:'', guardianName:'',guardianPhoneNumber:'', previousDegree:'', previousSchool:''},
                listQuery: {
                    pageNo: 1,
                    pageSize: 10,
                    sortBy:'id'
                },
                dialogFormVisible: false,
                listSemester:[],
                filterText: null,
                total:0,
                list:[],
                dialogStatus: '',
                loading: true,
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                rules: {
                    firstName:[
                        {required: true, message: 'please select first name', trigger: 'blur'}
                    ],
                    lastName:[
                        {required: true, message: 'please select last name', trigger: 'blur'}
                    ],
                    email:[
                        {required: true, message: 'please select email', trigger: 'blur'}
                    ],
                    mobileNumber:[
                        {required: true, message: 'please select mobile number', trigger: 'blur'}
                    ],
                    dateOfBirth:[
                        {required: true, message: 'please select date of birth', trigger: 'blur'}
                    ],
                    joinedDate:[
                        {required: true, message: 'please select joined date', trigger: 'blur'}
                    ],
                    temporaryAddress:[
                        {required: true, message: 'please select temporary address', trigger: 'blur'}
                    ],
                    permanentAddress:[
                        {required: true, message: 'please select permanent address', trigger: 'blur'}
                    ],
                    guardianName:[
                        {required: true, message: 'please select guardian name', trigger: 'blur'}
                    ],
                    guardianPhoneNumber:[
                        {required: true, message: 'please select guardian phone number', trigger: 'blur'}
                    ],
                    previousDegree:[
                        {required: true, message: 'please select previous degree', trigger: 'blur'}
                    ],
                    previousSchool:[
                        {required: true, message: 'please select previous school', trigger: 'blur'}
                    ],
                    semesterId:[
                            {required: true, message: 'please select semester', trigger: 'blur'}
                        ]
                }
            }
        },
        created(){
            this.getListOfStudent();
            this.getListOfSemester();
        },
        methods:{
            handleCreate(){
                this.resetStudent();
                this.dialogStatus = 'create';
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleUpdate(id)
            {
                this.retrieveById(id);
                this.dialogStatus = 'update';
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            retrieveById(id)
            {
              api.findById(id).then(response=>{
                  this.studentDetailDto=response.data;
              })
            },
            saveStudentDetail(studentDetailDto)
            {
                console.log(studentDetailDto);
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        api.save(studentDetailDto).then(response=>{
                            this.response = response.data;
                            this.dialogFormVisible = false
                            this.getListOfStudent();
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully Added',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
            })
            },
            updateStudentDetail(studentDetailDto)
            {
                console.log(studentDetailDto);
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        api.save(studentDetailDto).then(response=>{
                            this.response = response.data;
                            this.dialogFormVisible = false
                            this.getListOfStudent();
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully Updated',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                })
            },
            getListOfStudent(){
                api.findAll(this.listQuery).then(response=>{
                    this.list=response.data.details;
                    this.total=response.data.totalPage;
                    this.loading=false;
                })
            },
            getListOfSemester()
            {
               semesterapi.getAll().then(response=>{
                   this.listSemester=response.data;
               })
            },
            resetStudent()
            {
                this.studentDetailDto={semesterDto:{}}

            },
            filterTable() {
                const rows = this.$refs.tableRef.$refs.bodyWrapper.getElementsByClassName(
                    'el-table__row'
                )
                for (const row of rows) {
                    const cells = row.getElementsByTagName('td')
                    for (const cell of cells) {
                        const innerText = cell.innerText.toLowerCase()
                        const filterText = this.filterText.toLowerCase()
                        if (innerText.indexOf(filterText) > -1) {
                            row.style.display = ''
                            break
                        } else {
                            row.style.display = 'none'
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .status-button {
        padding-top: 5px;
    }

    .lab-container {
        padding-top: 20px;
        width: 80%;
        height: auto;
        margin: 0 auto;
        font-size: 14px;
    }

    #wrapper #content-wrapper {
        background-color: #f8f9fc;
        width: 100%;
        overflow-x: hidden;
    }

    #wrapper #content-wrapper #content {
        flex: 1 0 auto;
    }

    .status-button {
        padding-top: 5px;
    }

    .btn {
        margin-bottom: 1rem;
    }

    #lab-table {
        border-collapse: collapse;
        width: 100%;
    }

    #lab-table td, #lab-table th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    #lab-table tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    #lab-table tr:hover {
        background-color: #ddd;
    }

    #lab-table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        /*background-color: #20bdbe;*/
        color: #424242;
    }

    td {
        width: 250px;
    }

    img {
        width: 25%;
        height: 25%;
        padding-top: 5px;
    }

    label {
        size: 12px;
        color: #000000;
    }

    b {
        color: #f12121;
    }
</style>