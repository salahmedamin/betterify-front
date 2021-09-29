export const getTimeFromSeconds = (seconds)=>({
    hours: Math.floor(seconds/3600),
    minutes: seconds%3600 < 60 ? "00" : (Math.floor((seconds%3600)/60) < 10 ? "0"+Math.floor((seconds%3600)/60) : Math.floor((seconds%3600)/60) ),
    seconds: seconds%60 === 0 ? "00" : (Math.floor(seconds%60) < 10 ? "0"+Math.floor(seconds%60) : Math.floor(seconds%60)),
    raw: seconds
})