import multer from "multer";
const storage = multer.diskStorage({
    destination: (req, file, callBck) => {
        callBck(null, 'public/uploads')
    },
    filename: (req, file, callBck) => {
        const filename = file.originalname;
        callBck(null, filename);
    }
})

const upload = multer({ storage }); //final, configured middleware, ready to be used inside a route handler as the first layer to handle multipart/form-data
export default upload;