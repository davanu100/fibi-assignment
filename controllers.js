const Image = require('./models');
const urlMetaData = require('url-metadata');
const { collection } = require('./models');
var request = require('request');

exports.getImages = (req,res,next) => {
    const offset = req.query.offset;
    const limit = req.query.limit;
    const nameString = req.query.nameString;

    console.log(offset);
    console.log(limit);
    console.log(nameString);

    Image
    .find({
        $text : {
            $search : nameString,
            $caseSensitive : false,
        }
    })
    .skip(+offset)
    .limit(+limit)
    .then(images => {
        res.status(200).json({images : images});
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postImage = (req,res,next) => {
    const url = req.body.url;
const name = req.body.name;
const type = req.body.type;

const image = new Image({
	url : url,
	name : name,
	type : type
});

request({
	url : url,
	method : 'HEAD'
},
function(err,response,body) {
    let size = response.headers['content-length'];
    // console.log(size);
	let imageType = response.headers['content-type'].split('/')[1];
	image
		.save()
		.then(result => {
			console.log('Image Added!!');
			res.status(201).json({
				image: image,
				metadata: {
                    imageType,
                    size
                }
			});
		})
		.catch(err => console.log(err));
});
};