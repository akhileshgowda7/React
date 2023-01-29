import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

//@desc Auth user and get token
//@route POST /api/users/login
//@access PUBLIC

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password')
  }
});

export { authUser };
