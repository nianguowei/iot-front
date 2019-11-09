
/**
 * 工具类
 */
export default{
  install (Vue) {
    Vue.prototype.validator = (attr, val, self, dom) => {
      if (attr) {
        var arrVal = attr.split(',')
        for (var i = 0; i < arrVal.length; i++) {
          var arrMsg = arrVal[i].split('|')
          // 逐个进行验证，不通过跳出返回false,通过则继续
          if (!Vue.prototype.check(arrMsg[0], val)) {
            // if (self) {
            //   self.$message.warning(arrMsg[1])
            // }
            if (dom) {
              dom.focus()
              if (dom.type === 'select-one') {
                dom.style.border = '1px solid #ff9797'
              } else if (dom.type === 'radio' || dom.type === 'checkbox') {
                dom.parentElement.style.backgroundColor = '#ff9797'
                dom.parentElement.focus()
              } else {
                dom.style.backgroundColor = '#ff9797'
              }
            }
            return false
          }
        }
      }
      return true
    }

    Vue.prototype.check = (_match, val) => {
      var _matchArr = _match.split(':')
      // 根据验证情况，显示相应提示信息，返回相应的值
      switch (_matchArr[0]) {
        case 'required':
          return !!val
        case 'email':
          // 验证邮箱
          // return !!chk(val, /^\w+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i)
          return true
        case 'num':
          // 验证数字
          // return !!chk(val, /^[-]?\d+$/)
          if (val === '') {
            return true
          }
          return !!chk(val, /^[0-9]+([.]{1}[0-9]+){0,1}$/)
        case 'intNum':
          // 验证正整数
          return !!chk(val, /^(([0]{1})||([1-9][0-9]*))$/)
        case 'chinese':
          // 验证中文
          return !!chk(val, /^[\u4E00-\u9FA5]+$/)
        case 'mobile':
          // 验证手机
          return !!chk(val, /^1[0-9]{10}$/)
        case 'tel':
          // 验证电话
          return !!chk(val, /^\d+(-\d+)*$/)
        case 'idcard':
          // 验证身份证
          return !!chk(val, /^\d{14}\d{3}?\w$/)
        case 'max':
          if (!chk(val, /^[-]?\d+$/)) {
            return false
          }
          return parseInt(val) <= _matchArr[1]
        case 'maxLength':
          return val.length <= _matchArr[1]
        case 'min':
          if (!chk(val, /^[-]?\d+$/)) {
            return false
          }
          return parseInt(val) >= _matchArr[1]
        default:
          return true
      }
    }

      Vue.prototype.numberValidator = function (rule, value, callback) {
          if (/^[0-9]*$/.test(value) === false) {
              callback(new Error('请输入数字'))
          } else {
              callback()
          }
      }
      Vue.prototype.decimalValidator = function (rule, value, callback) {
          if (/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value) === false) {
              callback(new Error('请输入数字'))
          } else {
              callback()
          }
      }
      Vue.prototype.mobileValidator = function (rule, value, callback) {
          if (/^1\d{10}$/.test(value) === false) {
              callback(new Error('请输入正确的手机号'))
          } else {
              callback()
          }
      }

      Vue.prototype.telephoneValidator = function (rule, value, callback) {
          if (/\d{7,8}/.test(value) === false) {
              callback(new Error('请输入正确的座机号'))
          } else {
              callback()
          }
      }

      Vue.prototype.idCardValidator = function (rule, value, callback) {
          if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) === false) {
              callback(new Error('请输入正确身份证号'))
          } else {
              callback()
          }
      }
  }
}

function chk (str, reg) {
  return reg.test(str)
}
