module.exports = () => {
  return new Promise((res, rej)=>{
    res({uptime: Math.round(process.uptime())})
  })
}