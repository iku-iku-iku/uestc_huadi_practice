export default {
  registerProvinces(state, data) {
    state.provinces = Object.keys(data);
    state.province2Colleges = data;

    const colleges = [];
    const college2Id = {};
    const college2Province = {};
    const college2Type = {};
    state.provinces.forEach((province) => {
      data[province].forEach((col) => {
        colleges.push(col.collegeName);
        college2Id[col.collegeName] = col.collegeId;
        college2Province[col.collegeName] = province;
        college2Type[col.collegeName] = col.type;
      });
    });
    state.college2Type = college2Type;
    state.colleges = colleges;
    state.college2Id = college2Id;
    state.college2Province = college2Province;
    state.stateId++;
  },

  fetchUniversityInfo(state) {},
};
