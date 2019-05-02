module.exports = function(app){
    require('./health')(app);
    require('./users')(app);
    require('./friends')(app);
};