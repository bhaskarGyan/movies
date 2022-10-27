class DateFns {
  constructor() {
    this.DateFns = {}
    this.loaded = false
  }

  async init() {
    this.DateFns = await import('date-fns')
    this.loaded = true
  }
}

export default new DateFns()
