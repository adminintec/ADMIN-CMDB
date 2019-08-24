const isValidVersionFormat = (strValue) => 
  strValue.match(/^\d+(\.\d+).\d+(?=$| )*$/);

module.exports = isValidVersionFormat
