import {test, expect} from '@jest/globals';
import supertest from 'supertest';
import app from '../App';
import {pool} from "../db/index";

afterAll(async () => {
	await pool.end();
});


describe('/:id', ()=>{
    test('Get user favourites by ID', async () => {
        const response = await supertest(app)
        .get("/userfavourites/1")
        .set("Application", "application/json")
        expect(response.status).toBe(200)
        await pool.end();
    })
    
    
    
})

