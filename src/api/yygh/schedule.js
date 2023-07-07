import request from "@/utils/request";

export default {
  //查询排班日期列表（第二接口，查询日期列表）
  getScheduleRule(page, limit, hoscode, depcode) {
    return request({
      url: `/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
      method: "get"
    });
  },
  //查询排班详情列表（第三个接口：查询某个日期下的排班列表）
  getScheduleDetail(hoscode, depcode, workDate) {
    return request({
      url: `/admin/hosp/schedule/getScheduleDetail/${hoscode}/${depcode}/${workDate}`,
      method: "get"
    });
  }
};
