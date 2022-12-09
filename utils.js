module.exports.errorHandler = function(error){
    if(error){
        console.log(error)
    }
    else{
        console.log("Ready on port number 2525")
    }
}