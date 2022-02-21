
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const uploadImages = ( files, validExtension = ['jpg', 'png', 'jpeg', 'gif'], folder = '' ) => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const shortName = file.name.split('.');
        const extension = shortName[shortName.length-1]

        const tempName = uuidv4() + '.' + extension;

        //Validate extension
        if( !validExtension.includes(extension) ){
            return reject( `The extension ${extension} is not allowed.` )
        }

        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err) => {

            if (err) {
                return reject(err)
            }

            resolve(tempName);

        });
    })

}

module.exports = {
    uploadImages
}