require('../../config/global');

const codeSchema = new Schema({
    code : { type: String },
    name : { type: String },
    title : { type: String },
    status : { type: String },
    total : { type: Number },
},
{
    timestamps : true
});

// codeSchema.createIndexes({ code: 1 });

const codeModel = mongoose.model('code', codeSchema, 'code')

module.exports = codeModel;