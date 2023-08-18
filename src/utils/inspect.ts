import util from 'util'

const inspect = (item: any, item2?: any) => {
  console.log(util.inspect(item, { depth: null }), util.inspect(item2, { depth: null }))
}

export default inspect
