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
                                        :limit.sync="listQuery.pageSize" @pagination="getListOfSemseter"/>
                            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
                                <el-card shadow="never">
                                    <el-form ref="dataForm" :model="semesterDto" :rules="rules"
                                             label-width="190px">

                                        <el-form-item label="Semester Name" prop="semesterName">
                                            <el-input v-model="semesterDto.semesterName" type="text"
                                                      placeholder="Enter Semester"/>
                                        </el-form-item>

                                        <el-form-item label="Section Name" prop="sectionName">
                                            <el-input v-model="semesterDto.sectionName" type="text"
                                                      placeholder="Enter Section"/>
                                        </el-form-item>

                                        <el-form-item>
                                            <el-button @click="dialogFormVisible = false">Cancel</el-button>
                                            <el-button type="primary" @click="dialogStatus==='create'?saveSemester(semesterDto):updateSemester(semesterDto)">Confirm</el-button>
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
    import api from '../../api/semester-api'

    export default {
        name: "index",
        components:{sidebar, Pagination},
        data(){
            return{
                columns:[
                    {label: 'Id', prop: 'id', sortable: true, minWidth: 80},
                    {label:'Created Date', prop:'created', sortable:true, minWidth:80},
                    {label:'Section Name', prop:'sectionName', sortable:true, minWidth:80},
                    {label:'Semester Name', prop:'semesterName', sortable:true, minWidth:80}
                ],
                dialogFormVisible: false,
                filterText: null,
                dialogStatus: '',
                loading: true,
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                list:[],
                total:0,
                semesterDto:{semesterName:'', sectionName:''},
                listQuery: {
                    pageNo: 1,
                    pageSize: 10,
                    sortBy:'id'
                },
                rules:{
                    semesterName:[
                        {required: true, message: 'please select semester name', trigger: 'blur'}
                    ],
                    sectionName:[
                        {required: true, message: 'please select section name', trigger: 'blur'}

                    ]
                }
            }
        },
        created(){
          this.getListOfSemseter();
        },
        methods:{
            handleCreate(){
              this.resetSemester();
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
            saveSemester(semesterDto)
            {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        api.save(semesterDto).then(response => {
                            this.response = response.data;
                            this.dialogFormVisible = false
                            this.getListOfSemseter();
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
            updateSemester(semesterDto)
            {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        api.save(semesterDto).then(response => {
                            this.response = response.data;
                            this.dialogFormVisible = false
                            this.getListOfSemseter();
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
                  this.semesterDto=response.data;
              })
            },
            getListOfSemseter(){
                api.findAll(this.listQuery).then(response=>{
                    this.list=response.data.details;
                    this.total=response.data.totalPage;
                    this.loading=false;
                })
            },
            resetSemester() {
                this.semesterDto = {}
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