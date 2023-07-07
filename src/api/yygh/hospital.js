import request from "@/utils/request";

const api_name = "/admin/hosp/hospital";

export default {
  getPageData(data, pageNum, pageSize) {
    return request({
      url: `${api_name}/hospitalList/${pageNum}/${pageSize}`,
      method: "post",
      data
    });
  },
  updateStatus(id, status) {
    return request({
      url: `${api_name}/updateStatus/${id}/${status}`,
      method: "post"
    });
  },
  getHospById(id) {
    return request({
      url: `${api_name}/show/${id}`,
      method: "get"
    });
  },
  //查看医院科室（第一个接口，根据医院编号查询科室列表）
  getDeptByHoscode(hoscode) {
    return request({
      url: `/admin/hosp/department/getDeptList/${hoscode}`,
      method: "get"
    });
  }
};
