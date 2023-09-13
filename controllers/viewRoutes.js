const router = require('express').Router();
const session = require('express-session');
const {User, Blog, Comment} = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: User
        });
        const blogs = blogData.map((blogs) => blogs.get({
            plain: true
        }));
        res.render('home', {
            blogs,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: Comment, include: {
                        model: User,
                        attributes: ['id', 'username']
                    }
                },
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ]
        });
        const blog = blogData.get({plain: true})
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        console.log('error entered')
        res.status.json(err)
    }
})