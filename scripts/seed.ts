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
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
    
        
        

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

     await db.insert(schema.units).values([
        {
            id: 1,
            courseId: 1, // Spanish
            title: "Unit 1",
            description: "Learn the basics of Spanish",
            order: 1,
          }
        ]);

        await db.insert(schema.lessons).values([
            {
              id: 1,
              unitId: 1, // Unit 1 (Learn the basics...)
              order: 1,
              title: "Nouns",
            },
            {
              id: 2,
              unitId: 1, // Unit 1 (Learn the basics...)
              order: 2,
              title: "Verbs",
            },
            {
              id: 3,
              unitId: 1, // Unit 1 (Learn the basics...)
              order: 3,
              title: "Verbs",
            },
            {
              id: 4,
              unitId: 1, // Unit 1 (Learn the basics...)
              order: 4,
              title: "Verbs",
            },
            {
              id: 5,
              unitId: 1, // Unit 1 (Learn the basics...)
              order: 5,
              title: "Verbs",
            },
            
          ]);   

          await db.insert(schema.challenges).values([
            {
              id: 1,
              lessonId: 1, // Nouns
              type: "SELECT",
              order: 1,
              question: 'Which one of these is the "the man"?',
            },
            {
              id: 2,
              lessonId: 1, // Nouns
              type: "ASSIST",
              order: 2,
              question: '"the man"',
            },
            {
              id: 3,
              lessonId: 1, // Nouns
              type: "SELECT",
              order: 3,
              question: 'Which one of these is the "the robot"?',
            },
          ]);

          await db.insert(schema.challengeOptions).values([
            {
              challengeId: 1, // Which one of these is "the man"?
              imageSrc: "/man.svg",
              correct: true,
              text: "el hombre",
              audioSrc: "/es_man.mp3",
            },
            {
              challengeId: 1,
              imageSrc: "/woman.svg",
              correct: false,
              text: "la mujer",
              audioSrc: "/es_woman.mp3",
            },
            {
              challengeId: 1,
              imageSrc: "/robot.svg",
              correct: false,
              text: "el robot",
              audioSrc: "/es_robot.mp3",
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

