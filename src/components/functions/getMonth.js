const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
export const getMonth = (index)=>{
    try{
        return months[index]
    }
    catch(e){
        return "Error"
    }
}