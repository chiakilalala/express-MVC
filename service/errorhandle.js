

   
const errorhandle = (res, err) => {
  
  let message = '';
  if (err) {
    message = err.message;
    console.log(err)

  } else {
    message = "欄位未填寫正確或無此 id";
    console.log(err)
  }
  res.status(400).send({
    status: false,
    message
  })
  res.end();
}
module.exports = errorhandle;