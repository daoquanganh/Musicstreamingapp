import GenreService from "../services/genre"
import { Request, Response } from "express"
import Genre from "../entities/Genre"
import multer from "multer"
import path from 'path'

class GenreController {
    private categoryService: GenreService

    constructor() {
        this.categoryService = new GenreService()
    }
    
    //GET v1/category/list
    getGenres = async (request: Request, response: Response) => {
        try {
            Genre.findAll()
                .then(categorys => {
                    response.send(categorys)
                })
            const records = await this.categoryService.listGenres()
            return response.json(records);
        } catch (error: any) {
            return response.status(404).json({ error: error.message })
        }
    }

    //POST v1/category/
    add = async (request: Request, response: Response) => {
        try {
            const record = await this.categoryService.createGenre(request.body)
            console.log(record)
            return response.json({ record, msg: 'Successfully create category' })
        } catch (error: any) {
            response.status(400).json({ error: error.message })
        }
    }

    //GET v1/category/id:id
    getGenrebyId = async (request: Request, response: Response) => {
        try {
            const record = await this.categoryService.getById(request.params.id)
            return response.json(record);
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }

    //PUT v1/category/id:id
    update = async (request: Request, response: Response) => {
        try {
            const record = await this.categoryService.updateGenre(request.params.id, request.body)
            return response.json({record, msg: 'Successfully update category' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }
    //DELETE v1/category/id:id
    delete = async (request: Request, response: Response) => {
        try {
            const record = await this.categoryService.deleteGenre(request.params.id)
            return response.json({msg: 'Successfully delete category' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }

    // Image Controller
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./images/categorys")
        },
        filename: (req, file, cb) => {
            cb(null, "category"+ Date.now()+ path.extname(file.originalname))
        }
    })

    upload = multer({
        storage: this.storage,
        limits: {fileSize: 5000000},
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png/
            const mimeType = fileTypes.test(file.mimetype)
            const extname = fileTypes.test(path.extname(file.originalname))
        
            if (mimeType && extname) {
                return cb(null, true)
            }
            cb(Error('Give proper files format to upload'));
        }
    }).single('image')
}

export default GenreController