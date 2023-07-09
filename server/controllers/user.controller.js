const { userService, authService, emailService } = require("../services");
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const usersController = {
  async deleteUserByAdmin(req, res, next) {
    try {
      await userService.deleteUserByAdmin(req.body._id);
      res.json(req.body._id);
    } catch (error) {
      next(error);
    }
  },
  async modifyUserByAdmin(req, res, next) {
    try {
      const user = await userService.modifyUserByAdmin(req.body);
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  async createUserByAdmin(req, res, next) {
    try {
      const user = await userService.createUserByAdmin(req.body);
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  async getAllUser(req, res, next) {
    try {
      const users = await userService.findAllUser();
      res.json(users);
    } catch (error) {}
  },
  async getAllAccountExceptUser(req, res, next) {
    try {
      const users = await userService.findAllAccountExceptUser();
      res.json(users);
    } catch (error) {}
  },
  async profile(req, res, next) {
    try {
      const user = await userService.findUserById(req.user._id);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      // console.log(user._doc);
      res.json(res.locals.permissions.filter(user._doc));
    } catch (error) {
      next(error);
    }
  },
  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateUserProfile(req);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  async updateUserEmail(req, res, next) {
    try {
      const user = await userService.updateUserEmail(req);
      const token = await authService.genAuthToken(user);
      // send email to verify account
      await emailService.registerEmail(user.email, user);
      res.cookie("x-access-token", token).send({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
  async verifyAccount(req, res, next) {
    try {
      const token = await userService.validateToken(req.query.validation);
      const user = await userService.findUserById(token.sub);

      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      if (user.verified) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Already verified");
      }
      user.verified = true;
      user.save();
      res.status(httpStatus.CREATED).send({
        user,
      });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = usersController;
