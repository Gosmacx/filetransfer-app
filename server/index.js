const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload")
const { v4: uuidv4 } = require('uuid')
const fileSchema = require("./schemas/file")
const fs = require("fs")

const port = process.env.PORT || 3030
const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/file", express.static(__dirname + '/files'));

mongoose.connect("mongodb database link.", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("MongoDB Conneted.."));

app.get("/", (req, res) => {
    res.send("just dev.")
})

app.post("/upload", async (req, res) => {
    const { name } = req.body
    const file = req.files.file
    if (!file || !name) return res.status(400).send("Upload a file.")

    const creatUID = uuidv4()
    const extension = file.name.split(".")
    const path = creatUID + "." + extension[extension.length - 1]
    const filePath = __dirname + '/files/' + path ;

    file.mv(filePath, async (err) => {
        if (err) return res.status(400).send("err")

        const newFile = new fileSchema({
            name: name,
            path: path,
            extension: extension[extension.length - 1],
            size: file.data.length
        })
        await newFile.save()

        res.send(newFile)
    });

})

app.post("/getFile", async (req, res) => {
    const { name } = req.body
    if (!name) return res.status(400).send("Specify file name.")

    const file = await fileSchema.findOne({ name: name })
    if (!file) return res.status(400).send("File not found.")

    res.send(file)
})

app.post("/download", async (req, res) => {
    const { name } = req.body
    if (!name) return res.status(400).send("Err")

    const file = await fileSchema.findOne({ name: name })
    if (!file) return res.status(400).send("Err")

    const filePath = __dirname + '/files/' + file.path;

    try {
        fs.unlinkSync(filePath)
        await fileSchema.findOneAndDelete({ name: name })
    } catch (error) {
        console.log("File could not be deleted.")
    }

    res.sendStatus(200)

})

app.listen(port, () => {
    console.log(`Server Listen On ${port}  `)
})
