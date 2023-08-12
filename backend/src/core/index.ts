import express from "express"
import cors from "cors"
import { createServer, Server } from "http"
import routes from "../routes/index"
import db from "../configs/dbconfig"
import 'dotenv/config'
import bodyParser from "body-parser"
import helmet from "helmet"

class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server

    constructor(port = process.env.PORT, host = process.env.HOST) {
        this.port = port
        this.host = host

        this.app = this.createApp()
        this.server = this.createServer()
    }

    private createApp(): express.Application {
        const app = express()
        app.use(cors())
        app.use(helmet({
            crossOriginResourcePolicy: false,
          }))
        app.use(bodyParser.json())
        app.use('/uploads', express.static('./uploads'))
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use('/v1', routes)

        return app
      }

    private createServer(): Server {
        const server = createServer(this.app)

        return server
    }

    public start(): void {
        db.sync().then(()=> {
            this.server.listen(this.port, () => {
                console.log(`Connected to db`)
                console.log(`Running server on port ${this.port}`)
            })
        }).catch((err) => {
            console.log(err)
        })
    }
}

export default App