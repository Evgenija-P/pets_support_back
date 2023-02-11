const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegexp = /^\+380\d{2}\d{3}\d{2}\d{2}$/;

const dateRegexp =
  /(^(0+?[1-9]|[12][0-9]|3[01])[-\.](0+?[1-9]|[1][0-12])[-\.]((19|20)\d\d))/;

const cityRegexp =
  /^(([a-zA-Zа-яА-Я]([-]?)){1,})([^-,?,\s,.,0-9,!])+(,)+((\s?[a-zA-Zа-яА-Я](([-]?){0,1})){1,})([^-,?,.,\s,0-9,!])$/;

const priceRegexp = /^[1-9]+[0-9]*$/;

const userNameRegexp = /^([a-zA-Z]{1}|([a-zA-Z]{1,}['-]?[a-zA-Z])+)+$/;

const passwordRegexp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/;

module.exports = {
  phoneRegexp,
  emailRegex,
  dateRegexp,
  cityRegexp,
  priceRegexp,
  userNameRegexp,
  passwordRegexp,
};
