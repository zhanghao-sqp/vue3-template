// 校验规则

// 手机号码校验
export const validatePhone = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入手机号码'))
  }
  const reg = /^1[3456789]\d{9}$/
  if (!reg.test(value)) {
    return callback(new Error('请输入正确的手机号码'))
  }
  callback()
}

// 密码校验
export const validatePassword = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  }
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  if (!reg.test(value)) {
    return callback(new Error('请输入8-16位数字和字母组合的密码'))
  }
  callback()
}

// 邮箱校验
export const validateEmail = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入邮箱'))
  }
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  if (!reg.test(value)) {
    return callback(new Error('请输入正确的邮箱'))
  }
  callback()
}

// 身份证校验
export const validateIdCard = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入身份证号码'))
  }
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!reg.test(value)) {
    return callback(new Error('请输入正确的身份证号码'))
  }
  callback()
}
