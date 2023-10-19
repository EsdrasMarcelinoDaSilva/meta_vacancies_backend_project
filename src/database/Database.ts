import mongoose from 'mongoose'

export class Database {
    static lift(){
        return new Promise<void>((resolve, reject) => {
            mongoose.connection.on('open', () => {
                console.log('✅ Database connection established')
                resolve()
            })

            mongoose.connection.on('error', (error) => {
                console.error('❌ Database connection error:', error)
                reject(error)
            })
            mongoose.connect(process.env.DATABASE_URL as string)
        })
    }
}

