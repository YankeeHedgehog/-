import { PluginFunc } from "dayjs"
import { getJpEra, getJpYear } from "./utils"

export const jpFormat: PluginFunc = function(_o, c) {
    const proto = c.prototype
    const oldFormat = proto.format
  
    proto.format = function(formatStr: string) {
      const result = formatStr.replace(/\[([^\]]+)]|r+|/g, (match) => {
        switch (match) {
          case 'rrrr':
            return getJpYear(this.toDate())
          case 'rr':
            return getJpEra(this.toDate())
          default:
            return match
        }
      })
      return oldFormat.bind(this)(result)
    }
  }