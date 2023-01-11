import {test, expect} from '@jest/globals';
import request from 'supertest';
import app from '../App';
import {pool} from "../db/index";


    describe('/:id', ()=>{  
        test(`Get user favourites by ID`, async () => {
            const response = await request(app)
            .get("/userfavourites/1")
            .set("Application", "application/json")
            expect(response.status).toEqual(200)
            console.log(response.body)
            expect(response.body).toEqual({
                success: true,
                payload: expect.any(Array)  
            })
            const data = response.body.payload
            console.log(data)
            for(let i = 0; i<data.length; i++){
                expect(data[i]).toEqual({
                    id: expect.any(Number),
                    title: expect.any(String),
                    city: expect.any(String),
                    country: expect.any(String),
                    suburb: expect.any(String),
                    description: expect.any(String),
                    image: expect.any(String)
                })
            }
        })
       

       
    })
    
    afterAll(() => {
        pool.end();
    });
    




