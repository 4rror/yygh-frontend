<template>
  <div class="app-container">
    <!--{{ searchObj }}-->
    <el-form :inline="true" :model="searchObj" class="demo-form-inline">
      <el-form-item label="请选择省份">
        <el-select
          v-model="searchObj.provinceCode"
          @change="provinceChange"
          placeholder="请选择省份"
        >
          <el-option
            v-for="province in provinceList"
            :label="province.name"
            :value="province.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请选择城市">
        <el-select
          v-model="searchObj.cityCode"
          @change="cityChange"
          placeholder="请选择城市"
        >
          <el-option
            v-for="city in cityList"
            :label="city.name"
            :value="city.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请选择区县">
        <el-select v-model="searchObj.districtCode" placeholder="请选择区县">
          <el-option
            v-for="district in districtList"
            :label="district.name"
            :value="district.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医院名称">
        <el-input v-model="searchObj.hosname" placeholder="医院名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="clearForm">清除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="序号">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (pageNum - 1) * pageSize }}
        </template>
      </el-table-column>
      <el-table-column label="医院logo">
        <template slot-scope="scope">
          <el-image
            :src="'data:image/jpeg;base64,' + scope.row.logoData"
            style="width: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="hosname" label="医院名称"></el-table-column>
      <el-table-column label="医院等级">
        <template slot-scope="scope">
          {{ scope.row.param.hostypeString }}
        </template>
      </el-table-column>
      <el-table-column label="详情地址">
        <template slot-scope="scope">
          {{ scope.row.param.fullAddress }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <!--{{ scope.row.status === 1 ? "已上线" : "已下线" }}-->
          <el-switch
            :value="scope.row.status"
            :active-value="1"
            active-text="上线"
            active-color="#13ce66"
            :inactive-value="0"
            inactive-text="下线"
            @change="updateStatus(scope.row.id, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="showHospitalDetail(scope.row)"
            type="text"
            size="small"
          >
            查看
          </el-button>
          <!--<el-button type="text" size="small">编辑</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageNum"
      :page-sizes="[3, 5, 9]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="padding: 30px 0; text-align: center"
    >
    </el-pagination>
  </div>
</template>
<script>
import hospitalApi from "@/api/yygh/hospital";
import cmnApi from "@/api/yygh/cmn";
import router from "@/router";

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 3,
      total: 0,
      searchObj: {
        provinceCode: "",
        cityCode: "",
        hosname: "",
        districtCode: ""
      },
      tableData: [],
      provinceList: [],
      cityList: [],
      districtList: []
    };
  },
  created() {
    this.fetchData();
    this.findProvinceList();
  },
  methods: {
    fetchData(page = 1) {
      this.pageNum = page;
      hospitalApi
        .getPageData(this.searchObj, this.pageNum, this.pageSize)
        .then(resp => {
          this.tableData = resp.data.page.content;
          this.total = resp.data.page.totalElements;
        });
    },
    onSubmit() {
      this.fetchData();
    },
    clearForm() {
      this.cityList = [];
      this.searchObj = { provinceCode: "", cityCode: "", hosname: "" };
    },
    findProvinceList() {
      cmnApi.findByDictCode("Province").then(resp => {
        this.provinceList = resp.data.list;
      });
    },
    provinceChange() {
      this.searchObj.cityCode = "";
      this.searchObj.districtCode = "";
      this.districtList = [];
      cmnApi.dictList(this.searchObj.provinceCode).then(resp => {
        this.cityList = resp.data.list;
      });
    },
    cityChange() {
      this.searchObj.districtCode = "";
      cmnApi.dictList(this.searchObj.cityCode).then(resp => {
        this.districtList = resp.data.list;
      });
    },
    updateStatus(id, row) {
      // console.log(id, row);
      if (row.status === 1) {
        row.status = 0;
      } else {
        row.status = 1;
      }
      hospitalApi.updateStatus(id, row.status);
    },
    showHospitalDetail(row) {
      router.push(`hospDetail/${row.id}`);
    }
  }
};
</script>

<style scoped lang="scss"></style>
