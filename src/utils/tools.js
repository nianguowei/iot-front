/**
 * 工具类
 */
export default{
  install (Vue) {
    /**
     * 判断对象是否为空
     *
     * @param obj 对象
     * @return true: 为空, false: 不为空
     */
    Vue.prototype.isEmptyObject = (obj) => {
      if (Object.keys(obj).length > 0) {
        return false
      }
      return true
    }
      /**
       *
       * @param str
       */
    Vue.prototype.trim = (str) => {
       return str.replace(/(^\s*)|(\s*$)/g, '')
    }
    /**
     * 金额转换
     */
    Vue.prototype.convertCurrency = (money) => {
      // 汉字的数字
      var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
      // 基本单位
      var cnIntRadice = ['', '拾', '佰', '仟']
      // 对应整数部分扩展单位
      var cnIntUnits = ['', '万', '亿', '兆']
      // 对应小数部分单位
      var cnDecUnits = ['角', '分', '毫', '厘']
      // 整数金额时后面跟的字符
      var cnInteger = '整'
      // 整型完以后的单位
      var cnIntLast = '元'
      // 最大处理的数字
      var maxNum = 999999999999999.9999
      // 金额整数部分
      var integerNum
      // 金额小数部分
      var decimalNum
      // 输出的中文金额字符串
      var chineseStr = ''
      // 分离金额后用的数组，预定义
      var parts
      if (money === '') { return '' }
      money = parseFloat(money)
      if (money >= maxNum) {
        // 超出最大处理数字
        return ''
      }
      if (money === 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger
        return chineseStr
      }
      // 转换为字符串
      money = money.toString()
      if (money.indexOf('.') === -1) {
        integerNum = money
        decimalNum = ''
      } else {
        parts = money.split('.')
        integerNum = parts[0]
        decimalNum = parts[1].substr(0, 4)
      }
      // 获取整型部分转换
      if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0
        var IntLen = integerNum.length
        for (var i = 0; i < IntLen; i++) {
          var n = integerNum.substr(i, 1)
          var p = IntLen - i - 1
          var q = p / 4
          var m = p % 4
          if (n === '0') {
            zeroCount++
          } else {
            if (zeroCount > 0) {
              chineseStr += cnNums[0]
            }
            // 归零
            zeroCount = 0
            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
          }
          if (m === 0 && zeroCount < 4) {
            chineseStr += cnIntUnits[q]
          }
        }
        chineseStr += cnIntLast
      }
      // 小数部分
      if (decimalNum !== '') {
        var decLen = decimalNum.length
        for (var j = 0; j < decLen; j++) {
          var d = decimalNum.substr(j, 1)
          if (d !== '0') {
            chineseStr += cnNums[Number(d)] + cnDecUnits[j]
          }
        }
      }
      if (chineseStr === '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger
      } else if (decimalNum === '') {
        chineseStr += cnInteger
      }
      return chineseStr
    }

    /**
     * 使用循环的方式判断一个元素是否存在于一个数组中
     * @param {Object} arr 数组
     * @param {Object} value 元素值
     */
    Vue.prototype.isInArray = (arr, value) => {
      for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          return true
        }
      }
      return false
    }


    Vue.prototype.getParams = function (filter) {
      let request = Object.keys(filter).map(function (key) {
        return key + '=' + filter[key]
      }).join('&')
      return request
    }
  }
}
