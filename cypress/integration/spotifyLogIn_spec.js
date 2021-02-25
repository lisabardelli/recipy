describe('Sign up', function(){
  it('signs up a new user', function(){
    cy.visit('http://localhost:3000/')

    cy.contains('Login to Spotify')

    cy.get('.spotify-login').click()

    cy.contains('Please sign in to Spotify below') //needs 
  })
})
