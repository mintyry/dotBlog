const router = require('express').Router();

const { User, Post } = require('../../models');

// the 'api/users' endpoint

//make a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            //will be automatically logged in when creating an account
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

//log in to user acct
router.post('/login', async (req, res) => {
    try {
        const findUser = await User.findOne(
            {
                where: {
                    name: req.body.name
                }
            }
        );

        //checks for valid login info follow

        if (!findUser) {
            res.status(400).json({ message: 'Incorrect login; please try again.' });
            return;
        }

        //method made in User model extension
        const validPw = await findUser.checkPassword(req.body.password);

        if (!validPw) {
            res.status(400).json({ message: 'Incorrect login; please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = findUser.id;
            req.session.logged_in = true;

            res.json({ user: findUser, message: 'Congrats, you\'re now logged into dotBlog!' });
        });

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});


//log user out
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });

    } else {
        console.log(error);
        res.status(404).end();
    }
});


module.exports = router;