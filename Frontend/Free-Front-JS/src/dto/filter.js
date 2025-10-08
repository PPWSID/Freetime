
class Filter {
  code = undefined;
  status = undefined;
  start_date = undefined;
  end_date = undefined;

  constructor(selectedFilter) {
    this.code = selectedFilter?.code;
    this.status = selectedFilter?.status;
    this.start_date = selectedFilter?.start_date;
    this.end_date = selectedFilter?.end_date;
  }

//   getStatus() {
//     if (!this.status) return 'สถานะ';
//     return serviceTypes.find((type) => type.value === this.status)?.text;
//   }
}

export default Filter;
