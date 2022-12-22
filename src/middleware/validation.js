
const isValid = function (x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;
    return true;
};
const isValidBody = function (x) {
    return Object.keys(x).length > 0;
};

const nameRegex = /^[a-zA-Z\s]+$/

const emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/

const validMobile = /^(\+91)?0?[6-9]\d{9}$/

const dateRgx=/^(00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;

module.exports ={
    isValid,
    isValidBody,
    nameRegex,
    emailRegex,
    validMobile,
    dateRgx
}