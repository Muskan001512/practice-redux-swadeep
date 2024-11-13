import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { __dirname } from "../index.js";

const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export const validateData = (arr, body) => {
    console.log(body)
    for (const key of arr) {
        if (!body?.[key]) {
            return `${key} is required`
        }
    }
    return true
}

export const uploadMultipleImages = (req, res) => {
    console.log(req.files);
    console.log(req.body);
    let pathArray = []
    console.log("req.files", typeof req?.files);
    console.log("req.files", Array.isArray(req?.files));
    // let slug = "test-venue"
    console.log(req.body)
    res.send("shgfdgf")
    console.log(path.join(__dirname, `../frontend/public/uploads/${slug}/products`), "__dirname")
    if (Object.keys(req?.files)?.length > 1) {
        console.log(true)
        for (const element in req?.files) {
            console.log(element)
            const file = req?.files?.[element];
            console.log(file, "file");
            console.log(path.basename(file.name))

            const uploadPath = path.join(__dirname, `../frontend/public/uploads/${slug}/products`, path.basename(file.name));
            console.log(uploadPath, "uploadPath", fs.existsSync("uploads"));

            if (!fs.existsSync(path.dirname(uploadPath))) {
                fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
            }
            // res.send("Run Successfully")

            file.mv(uploadPath, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
            });
            console.log(req?.body)
            pathArray.push(`${slug}/products/${path.basename(file.name)}`)
            // return `uploads/${path.basename(uploadPath)}`
        }
    } else {
        console.log(false)
    }
    res.send(pathArray)
   
}


export const uploadImages = (req, res) => {
    console.log(req.files);
    console.log(req.body);
    console.log("req.files", typeof req?.files);
    console.log("req.files", Array.isArray(req?.files));
    if (!req.files || !req.files.file) return
    const file = req.files.file;
    console.log(file, "file");
    const uploadPath = path.join(__dirname, '../frontend/public/uploads', Date.now() + path.extname(file.name));
    console.log(uploadPath, "uploadPath", fs.existsSync("uploads"));

    if (!fs.existsSync(path.dirname(uploadPath))) {
        fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
    }

    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
    console.log(req?.body)
    return `uploads/${path.basename(uploadPath)}`
}

export const commonSchema = {
    type: String,
    required: true,
}
export const commonUniqueSchema = {
    type: String,
    required: true,
    unique: true
}