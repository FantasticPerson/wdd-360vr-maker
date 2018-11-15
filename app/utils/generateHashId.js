const Hashids = require('hashids')
const moment = require('moment')

const defaultProps = {
  salt: '360vr makert client',
  length: 10,
  alphabet: '0123456789abcdefghijklmnopqrstuvwxyz',
}

export default class Hashid {
  constructor(props = {}) {
    this.props = {
      ...defaultProps,
      ...props
    }

    this.ids = new Hashids(this.props.salt, this.props.length, this.props.alphabet)
  }

  encode(id, extra1 = 0, extra2 = 0) {
    id = id === undefined ? moment().valueOf() : id
    return this.ids.encode(id, extra1, extra2)
  }
}