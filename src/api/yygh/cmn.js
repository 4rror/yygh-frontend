import request from "@/utils/request";

const api_name = "/admin/cmn/dict";

export default {
  dictList(id) {
    //数据字典列表
    return request({
      url: `${api_name}/findChildData/${id}`,
      method: "get"
    });
  },
  findByDictCode(dictCode) {
    return request({
      url: `${api_name}/findByDictCode/${dictCode}`,
      method: "get"
    });
  }
};
