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
  }
};
