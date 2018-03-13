module.exports = timestamp;
function timestamp(req, res,next){
    if(req.method === 'PUT'){
        req.model.updateDate = new Date();
        delete req.model.createDate
        next()
    }
    else{
        delete req.model.updateDate
        next()
    }
}