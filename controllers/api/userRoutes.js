const router = require('express').Router();

const { User, Post } = require('../../models');

// the 'api/users' endpoint
//may want to delete this, bc in reality, you dont want to show a list of every user and all of their info
//maybe keep, so when logged in, user can see their own info?
router.get('/', async (req, res) => {
    try {
        const showUsers = await User.findAll();
        res.status(200).json(showUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//the above route works

router.get('/:id', async (req, res) => {
    //find one user and their posts
    try {
        const singleUser = await User.findByPk(req.params.id,
            {
                include: [Post]
            });
        if (!singleUser) {
            res.status(404).json({ message: 'MISSING! This user hasn\'t been seen ever!' });
            return;
        }
        res.status(200).json(singleUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

//above route works; shows user and their posts

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
                    email: req.body.email
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
            req, session.logged_in = true;

            res.json({ user: findUser, message: 'Congrats, you\'re now logged into dotBlog!' });
        });

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
//error: connection refused by server

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
//dont know how to test this if login didnt work

module.exports = router;