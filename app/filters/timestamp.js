module.exports = timestamp;
function timestamp(req, res,next){
    if(req.method === 'PUT'){
        req.model.updateDate = new Date();
        delete req.model.createDate
        next()
    }
    else if(req.method === 'POST'){
        delete req.model.updateDate
        next()
    }
    else{
        res.status(500).send('Timestamp does not support this method')
    }
}
