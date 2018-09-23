var should = require( 'chai' ).should,
    expect = require( 'chai' ).expect,
    assert = require( 'assert' ),
    supertest = require( 'supertest' ),
    api = supertest(  );
        
describe( 'Guarantors Api Tests', function() {
    
    it( 'should return a 200 response', function( done ) {
        api.get( '/qa-test/' )
            .set( 'Accept', 'application/json' )
            .expect( 'content-type', 'text/html; charset=utf-8' )
            .expect( 'server', 'nginx/1.10.3' )
            .expect( 200, done ) 
    });

    it( 'should return sorted array after posting numeric payload', function( done ) {
        api.post( '/qa-test/' )
        .set( 'Accept', 'application/json' )
        .send( {
            numbers: [ 1,15,0,19,27,38,100,28,38,777,1000,50000,2000 ]
        } )
        .expect( 'Content-Type', 'application/json; charset=utf-8' )
        .expect( function( res ){
            expect( res.body ).to.deep.equal( [ 1, 15, 0, 19, 27, 28, 38, 38, 100, 777, 1000, 2000, 50000 ] );
        })
        .expect( 200, done)
    });

    it( 'should return sorted duplicate array items', function( done ) {
        api.post( '/qa-test/' )
        .set( 'Accept', 'application/json' )
        .send( {
            numbers: [ 15,1,15,15,1.9,2.7,3.8,1.00,28,38,777,1000,50000,2000 ]
        } )
        .expect( 'Content-Type', 'application/json; charset=utf-8' )
        .expect( function( res ){
            expect( res.body ).to.deep.equal( [ 1, 1, 1.9, 2.7, 3.8, 15, 15, 15, 28, 38, 777, 1000, 2000, 50000 ] );
        })
        .expect( 200, done)
    });
    
    it( 'should return sorted array Items with negative & non negative numbers', function( done ) {
        api.post( '/qa-test/' )
        .set( 'Accept', 'application/json' )
        .send( {
            numbers: [ -0,-100,-100000,-8982,-7273872837,82938289389,10,100,238 ]
        } )
        .expect( 'Content-Type', 'application/json; charset=utf-8' )
        .expect( function( res ){
            expect( res.body ).to.deep.equal( [ -7273872837, -100000, -8982, -100, 0, 10, 100, 238, 82938289389 ] );
        })
        .expect( 200, done)
    });

    it( 'should return sorted array Items & not matches' , function( done ) {
        api.post( '/qa-test/' )
        .set( 'Accept', 'application/json' )
        .send( {
            numbers: [ -0,-100,-100000,-8982,-7273872837,82938289389,10,100,238 ]
        } )
        .expect( 'Content-Type', 'application/json; charset=utf-8' )
        .expect( function( res ){
            expect( res.body ).not.to.deep.equal( [ -7273872837, -100000, -8982, -100, 0, 10, 100, 238 ] );
        })
        .expect( 200, done)
    });

    it( 'should return alphabets as added', function( done ) {
        api.post( '/qa-test/' )
        .set( 'Accept', 'application/json' )
        .send( {
            numbers: [ -0,-100,-100000,-8982,-7273872837,82938289389,10,100,238, "A" ]
        } )
        .expect( 'Content-Type', 'application/json; charset=utf-8' )
        .expect( function( res ){
            expect( res.body ).to.deep.equal( [ -7273872837, -100000, -8982, -100, 0, 10, 100, 238, 82938289389, "A" ] );
        })
        .expect( 200, done)
    });

    it( 'should return empty array', function( done ) {
        api.post( '/qa-test/' )
        .set( 'Accept', 'application/json' )
        .send( {
            numbers: []
        } )
        .expect( 'Content-Type', 'application/json; charset=utf-8' )
        .expect( function( res ){
            expect( res.body ).to.deep.equal( [] );
        })
        .expect( 200, done)
    });

    it( 'should POST 5 digit numbers & not equal to empty array', function( done ) {
        api.post( '/qa-test/' )
        .set( 'Accept', 'application/json' )
        .send( {
            numbers: [ 17000, 40005, 75000, 90000, 00002, 800002, 2000, 60600 ]
        } )
        .expect( 'Content-Type', 'application/json; charset=utf-8' )
        .expect( function( res ){
            expect( res.body ).not.to.deep.equal( [] );
        })
        .expect( 200, done)
    });

    it( 'should delete 5 digit numbers and throw 404', function( done ) {
        api.delete( '/qa-test/' )
        .set( 'Accept', 'application/json' )
        .send( {
            numbers: [ 17000 ]
        } )
        .expect( 'Content-Type', 'text/html; charset=utf-8' )
        .expect( function( res ){
            expect( res.body ).not.to.deep.equal( [] );
        })
        .expect( 404, done)
    });

    it( 'should put 5 digit numbers and throw 404', function( done ) {
        api.delete( '/qa-test/' )
        .set( 'Accept', 'application/json' )
        .send( {
            numbers: [ 17000 ]
        } )
        .expect( 'Content-Type', 'text/html; charset=utf-8' )
        .expect( function( res ){
            expect( res.body ).not.to.deep.equal( [] );
        })
        .expect( 404, done)
    });
});