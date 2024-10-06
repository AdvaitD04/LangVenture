import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import {neon} from "@neondatabase/serverless"

//Seeding a database is the process of adding initial data to a database to prepare it for testing and development

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql,{schema});

const main = async () =>{
    try{
        console.log("seeding teh database")
        await db.delete(schema.courses);
        await db.delete(schema.userProgress)

        await db.insert(schema.courses).values([
            {
            id: 1,
            title:"Spanish",
            imageSrc:"/es.svg",
        },

        {
            id: 2,
            title:"italian",
            imageSrc:"/it.svg",
        },

        {
            id: 3,
            title:"French",
            imageSrc:"/fr.svg",
        },

        {
            id: 4,
            title:"Croatian",
            imageSrc:"/hr.svg",
        },


    ]);
        console.log("Seeding finished")
    }

    catch(e){
        console.error(e);
        throw new Error("Failed to seed the database")
    }
}

main();

