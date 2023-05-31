import { ax } from "../index";

export class SuperadminServices {
  standardDataGetApi() {
    return ax.get("/superadmin/user");
  }
  standardRoleDataGetApi() {
    return ax.get("/admin/standardDataForAdmin/role");
  }
  standardAddUserPostApi(payLoad) {
    return ax.post("/superadmin/user", payLoad);
  }
  standardDataDeleteApi(user_id) {
    return ax.delete(`/superadmin/user/${user_id}`);
  }
  standardDataPutApi(payLoad) {
    return ax.put(`/superadmin/user`, payLoad);
  }
  standardDataPutGetOneUserApi(user_id) {
    return ax.get(`/superadmin/oneUser/${user_id}`);
  }
  sadminDashboardTopCount() {
    return ax.get(`/me/dashboardTopCount`);
  }
}
