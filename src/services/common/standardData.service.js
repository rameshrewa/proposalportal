import { ax, srcmApiv2, srcmAx } from "../index";

export default class StandardDataService {
  // Project Sec
  standardDataApi(params) {
    return ax.get(`candidate/standardData/${params}`);
  }
  srcmCountries() {
    return srcmApiv2.get("/countries/");
  }
  abhyasiSearch(id) {
    return srcmApiv2.get(`/abhyasis/search/?ref=${id}`);
  }
  srcmStates(country) {
    return srcmApiv2.get(`/states/?country${country}`);
  }
  // srcmCitites(country) {
  //   return srcmApiv2.get(`/cities/?state${country}`);
  // }
  srcmCitites(item) {
    return srcmAx.get(`cities/${item}.json`);
  }
  srcmCenters(item) {
    return srcmApiv2.get(`/groups/?name__icontains=${item}&group_type=center`);
  }
  srcmGetCenters(item) {
    return srcmApiv2.get(`/groups/?id=${item}`);
  }
}
