export function getFilteredSearch(data, searchData) {
  return data.filter(value => {
    if (!searchData) return value;
    if (value.name.toLowerCase().includes(searchData.toLocaleLowerCase()))
      return value;

    return;
  });
}
export function getRouteTypeAreaList(data = []) {
  const values = {route: {}, type: {}, area: {}};
  const finalValues = {route: [], type: [], area: []};

  data.forEach(element => {
    if (!values.route[element.route]) {
      values.route[element.route] = element.route;
      finalValues.route.push({value: element.route, label: element.route});
    }
    if (!values.type[element.type]) {
      values.type[element.type] = element.type;
      finalValues.type.push({value: element.type, label: element.type});
    }
    if (!values.area[element.area]) {
      values.area[element.area] = element.area;
      finalValues.area.push({value: element.area, label: element.area});
    }
  });
  return finalValues;
}
