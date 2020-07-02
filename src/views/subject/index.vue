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
                            <el-button @click="handleCreate" type="primary">
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
                                <el-table-column label="Actions" width="73px" >
                                                                    <template slot-scope="{row}">
                                                                        <el-button type="primary" size="mini" @click="handleUpdate(row.id)">
                                                                            Edit
                                                                        </el-button>
                                                                    </template>
                                </el-table-column>

                            </el-table>
                            <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo"
                                        :limit.sync="listQuery.pageSize" @pagination="getListOfSubject"/>
                            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
                                <el-card shadow="never">
                                    <el-form ref="dataForm" :model="subjectDto" :rules="rules"
                                             label-width="190px">

                                        <el-form-item label="Subject Name" prop="subjectName">
                                            <el-input v-model="subjectDto.subjectName" type="text"
                                                      placeholder="Enter Subject"/>
                                        </el-form-item>

                                        <el-form-item label="Subject Code" prop="subjectCode">
                                            <el-input v-model="subjectDto.subjectCode" type="text"
                                                      placeholder="Enter Section"/>
                                        </el-form-item>

                                        <el-form-item>
                                            <el-button @click="dialogFormVisible = false">Cancel</el-button>
                                            <el-button type="primary" @click="dialogStatus==='create'?saveSubject(subjectDto):updateSubject(subjectDto)">Confirm</el-button>
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
    import api from '../../api/subject-api';
    import sidebar from "../../layout/components/sidebar";
    import Pagination from "../../layout/components/pagination"
    export default {
        name: "index",
        components:{sidebar, Pagination},
        data(){
            return{
                columns:[{label: 'Id', prop: 'id', sortable: true, minWidth: 80},
                    {label:'Created', prop:'created', sortable:true, minWidth:80},
                    {label:'Subject Name', prop:'subjectName', sortable:true, minWidth:80},
                    {label:'Subject Code', prop:'subjectCode', sortable:true, minWidth:80}
                ],
                listQuery: {
                    pageNo: 1,
                    pageSize: 10,
                    sortBy:'id'
                },
                dialogFormVisible: false,
                filterText: null,
                labPackageDetailList: [],
                dialogStatus: '',
                loading: true,
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                list:[],
                total:0,
                subjectDto:{subjectName:'', subjectCode:''},
                rules:{
                    subjectName:[
                        {required: true, message: 'please select subject name', trigger: 'blur'}
                    ],
                    subjectCode:[
                        {required: true, message: 'please select subject code', trigger: 'blur'}

                    ]
                }
            }
        },
        created(){
            this.getListOfSubject();
        },
        methods:{
            handleCreate(){
                this.resetSubject();
                this.dialogStatus = 'create';
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleUpdate(id){
                this.retrieveById(id);
                this.dialogStatus = 'update';
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
              getListOfSubject()
              {
                  api.findAll(this.listQuery).then(response=>{
                      this.list=response.data.details;
                      this.total=response.data.totalPages;
                      this.loading=false;
                  })
              },
            saveSubject(subjectDto) {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        api.save(subjectDto).then(response=>{
                            this.response = response.data;
                            this.dialogFormVisible = false
                            this.getListOfSubject();
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
            updateSubject(subjectDto) {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        api.save(subjectDto).then(response=>{
                            this.response = response.data;
                            this.dialogFormVisible = false
                            this.getListOfSubject();
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
            retrieveById(id)
            {
              api.findById(id).then(response=>{
                  this.subjectDto=response.data;
              })
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
            resetSubject()
            {
                this.subjectDto={}
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