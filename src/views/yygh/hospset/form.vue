<template>
  <div class="app-container">
    <el-form label-width="80px">
      <el-form-item label="医院名称">
        <el-input v-model="hospset.hosname" />
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospset.hoscode" />
      </el-form-item>
      <el-form-item label="API路径">
        <!-- 平台端调用医院端接口时要使用 -->
        <el-input v-model="hospset.apiUrl" />
      </el-form-item>
      <el-form-item label="签名key">
        <el-input v-model="hospset.signKey" />
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="hospset.contactsName" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="hospset.contactsPhone" />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import hospset from "@/api/yygh/hospset";

export default {
  data() {
    return {
      hospset: {},
      saveBtnDisabled: false // 保存按钮是否禁用,
    };
  },
  methods: {
    saveOrUpdate() {
      this.saveBtnDisabled = true;
      if (!this.hospset.id) {
        this.saveData();
      } else {
        this.updateData();
      }
    },
    // 保存
    saveData() {
      hospset.save(this.hospset).then(resp => {
        if (resp.code === 20000) {
          //开通成功
          this.$message({
            message: "开通成功！",
            type: "success"
          });
          //回到列表页面,path写列表页面对应的路由路径
          this.$router.push({ path: "/yygh/hospset/list" });
        } else {
          this.$message.error("开通失败");
        }
      });
    },
    fetchDataById(id) {
      hospset.getById(id).then(resp => {
        this.hospset = resp.data.item;
      });
    },
    updateData() {
      hospset.updateById(this.hospset).then(resp => {
        if (resp.code === 20000) {
          this.$message({
            message: "修改成功！",
            type: "success"
          });
          //回到列表页面
          this.$router.push({ path: "/yygh/hospset/list" });
        }
      });
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.fetchDataById(id);
    }
  }
};
</script>
<style scoped lang="scss"></style>
