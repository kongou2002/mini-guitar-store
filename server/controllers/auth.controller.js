const { authService, emailService } = require( "../services" );

const authController = {
  async register( req, res, next ) {
    try {
      const { email, password } = req.body;
      const user = await authService.createUser( email, password );
      // generate token
      const token = await authService.genAuthToken( user );

      //send email
      await emailService.registerEmail( email, user )
      res.cookie( "x-access-token", token ).status( 200 ).send( {
        user,
        token,
      } );
    } catch ( error ) {
      next( error );
    }
  },
  async signin( req, res, next ) {
    try {
      const { email, password } = req.body;
      const user = await authService.signInWithEmailandPassword(
        email,
        password
      );
      const token = await authService.genAuthToken( user );
      res.cookie( "x-access-token", token ).send( {
        user,
        token,
      } );
    } catch ( error ) {
      next( error );
    }
  },
  async isauth( req, res, next ) {
    res.json( req.user );
  },
};
module.exports = authController;
