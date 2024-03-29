
import express from 'express';
import request from 'supertest';
import {movieRoute} from '../../route';

const app = express();
app.use(movieRoute);

  describe('/movies', ()=>
    test('should return status 201 & content-type "application/json"',async ()=>{
        const response = await request(app)
        .get('/movies');
        // console.log(response);

        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toContain('application/json')
    }))