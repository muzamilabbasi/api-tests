var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('https://TheApiYouUsing');


describe('Api Tests', function() {
    
    it('should return a 200 response', () => {
        api.get('/qa-test/')
            .expect(200);
    });

    it('should return 200 after posting the payload', () => {
        api.post('/qa-test/')
        .send({
            numbers: [1, 2, 3,5,10,15],
        })
        .expect('Content-Type', /json/)
        .expect(200)
    })

});