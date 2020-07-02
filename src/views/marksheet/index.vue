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
                            <el-button @click="handleCreate"  type="primary">
                                Add
                            </el-button>


                            <el-button  :loading="downloadLoading" type="primary" icon="el-icon-download" @click="handleDownload">
                                Export
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
                                <el-table-column label="Actions" width="73px" >
                                    <template slot-scope="{row}">
                                        <el-button type="primary" size="mini" @click="handleUpdate(row.id)">
                                            Edit
                                        </el-button>
                                    </template>
                                </el-table-column>


                            </el-table>
                            <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo"
                                        :limit.sync="listQuery.pageSize" @pagination="getListOfMarksheet"/>

                            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
                                <el-card shadow="never">
                                    <el-form ref="dataForm" :model="marksheetDto" :rules="rules"
                                             label-width="190px">
                                        <el-form-item label="Subject"  prop="subjectId">
                                            <el-select v-model="marksheetDto.subjectId">
                                                <div v-for="data in subjectList">
                                                    <el-option v-bind:value="data.id">
                                                        {{data.subjectName}}
                                                    </el-option>
                                                </div>
                                            </el-select>

                                        </el-form-item>


                                        <el-form-item label="Student"  prop="studentId">
                                            <el-select v-model="marksheetDto.studentId">
                                                <div v-for="data in studentList">
                                                    <el-option v-bind:value="data.id">
                                                        {{data.firstName}} {{data.lastName}}
                                                    </el-option>
                                                </div>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item label="Full Marks">
                                            <el-input  type="number"
                                                       value="100" readonly="true"/>
                                        </el-form-item>


                                        <el-form-item label="Pass Marks">
                                            <el-input  type="number"
                                                       value="40" readonly="true"/>
                                        </el-form-item>


                                        <el-form-item label="Obtaimed Marks" prop="obtainedMarks">
                                            <el-input v-model="marksheetDto.obtainedMarks" type="number"
                                                      />
                                        </el-form-item>


                                        <el-form-item>
                                            <el-button @click="dialogFormVisible = false">Cancel</el-button>
                                            <el-button type="primary" @click="dialogStatus==='create'?saveMarksheet(marksheetDto):updateMarksheet(marksheetDto)">Confirm</el-button>

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
    import sidebar from "../../layout/components/sidebar";
    import Pagination from "../../layout/components/pagination"
    import api from '../../api/marksheet-api';
    import studentapi from '../../api/student-api';
    import semesterapi from '../../api/semester-api';
    import subjectapi from '../../api/subject-api';


    export default {
        name: "index",
        components: {sidebar, Pagination},
        data() {
            return {
                list:[],
                studentList:[],
                subjectList:[],
                semesterList:[],
                downloadLoading: false,
                columns:[ {label: 'Id', prop: 'id', sortable: true, minWidth: 80},
                    {label:'Created Date', prop:'created', sortable:true, minWidth:80},
                    {label:'First Name', prop:'firstName', sortable:true, minWidth:80},
                    {label:'Middle Name', prop:'middleName', sortable:true, minWidth:80},
                    {label:'Last Name', prop:'lastName', sortable:true, minWidth:80},
                    {label:'Subject Name', prop:'subjectName', sortable:true, minWidth:80},
                    {label:'Full Marks', prop:'fullMarks', sortable:true, minWidth:80},
                    {label:'Pass Marks', prop:'passMarks', sortable:true, minWidth:80},
                    {label:'Obtained Marks', prop:'obtainedMarks', sortable:true, minWidth:80},
                    {label:'Status', prop:'resultStatus', sortable:true, minWidth:80}
                    ],
                dialogFormVisible: false,
                filterText: null,
                dialogStatus: '',
                loading: true,
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                total:0,
                listQuery: {
                    pageNo: 1,
                    pageSize: 10,
                    sortBy:'id'
                },
                marksheetDto:{subjectId:'', studentId:'',fullMarks:'', passMarks:'', obtainedMarks:''},
                rules:{
                    subjectId:[
                        {required: true, message: 'please select subject', trigger: 'blur'}
                    ],
                    studentId:[
                        {required: true, message: 'please select student', trigger: 'blur'}
                    ],
                    obtainedMarks:[
                        {required: true, message: 'please enter obtained marks', trigger: 'blur'}
                    ]
                }
            }
        },
        created(){
          this.getListOfMarksheet();
          this.getListOfStudent();
          this.getListOfSemester();
          this.getListOfSubject();
        },
        methods:{
            handleCreate()
            {
                this.resetMarksheet();
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
                  this.marksheetDto=response.data;
              })
            },
            getListOfMarksheet()
            {
                api.findAll(this.listQuery).then(response=>{
                    this.list=response.data.details;
                    this.total=response.data.totalPage;
                    this.loading=false;
                })
            },

            resetMarksheet()
            {
              this.marksheetDto={};
            },
            getListOfSubject()
            {
              subjectapi.getAll().then(response=>{
                  this.subjectList=response.data;
              })
            },
            getListOfSemester()
            {
              semesterapi.getAll().then(response=>{
                  this.semesterList=response.data;
              })
            },
            getListOfStudent()
            {
              studentapi.getAll().then(response=>{
                  this.studentList=response.data;
              })
            },
            saveMarksheet(marksheetDto)
            {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        marksheetDto.passMarks=40;
                        marksheetDto.fullMarks=100;
                    api.save(marksheetDto).then(response=>{
                        this.response = response.data;
                        this.dialogFormVisible = false
                        this.getListOfMarksheet();
                        this.$notify({
                            title: 'Success',
                            message: 'Successfully Added',
                            type: 'success',
                            duration: 2000
                        })
                    })
                    }
                });
            },
            updateMarksheet(marksheetDto)
            {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        marksheetDto.passMarks=40;
                        marksheetDto.fullMarks=100;
                        api.save(marksheetDto).then(response=>{
                            this.response = response.data;
                            this.dialogFormVisible = false
                            this.getListOfMarksheet();
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully Updated',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                });
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
            },
            handleDownload()
            {
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['Id','First Name', 'Middle Name', 'Last Name','Subject Id','Subject Name', 'Full Marks', 'Pass Marks', 'Obtained Marks', 'Result Status']
                    const filterVal = ['id','firstName','middleName','lastName','subjectId','subjectName','fullMarks', 'passMarks','obtainedMarks','resultStatus']
                    const data = this.formatJson(filterVal, this.list)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: 'Student-Marksheet-List'
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j==='id') {
                        return v.id
                    }
                    else if (j==='firstName') {
                        return v.firstName
                    } else if (j==='middleName') {
                        return v.middleName
                    }else if (j==='lastName') {
                        return v.lastName
                    }
                    else if(j==='subjectId')
                    {
                        return v.subjectId
                    }
                    else if(j==='subjectName')
                    {
                        return v.subjectName
                    }
                    else if(j==='fullMarks')
                    {
                        return v.fullMarks
                    }
                    else if(j==='passMarks')
                    {
                        return v.passMarks
                    }
                    else if(j==='obtainedMarks')
                    {
                        return v.obtainedMarks
                    }
                    else if(j==='resultStatus')
                    {
                        return v.resultStatus
                    }
                    else {
                        return v[j]
                    }
                }))
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