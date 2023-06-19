const { create, deleteById, getAllByDate, getById, edit, enroll } = require('../services/courseService');
const { parseError } = require('../util/parser');


const courseController = require('express').Router();

// TODO replace with real controller by assignment
courseController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create page',
        user: req.user
    })
})
courseController.post('/create', async (req, res) => {
    // In an Express.js application, req.body is a property of the request object (req). It is used to access the data sent in the body of an HTTP POST, PUT, or PATCH request.
    const course = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        owner: req.user._id
    }
    try {
        await create(course);
        res.redirect('/')
    } catch (error) {
        const errors = parseError(error)
        res.render('create', {
            title: 'Create Page',
            errors,
            body: course
        })
    }

})

courseController.get('/:id/details', async (req, res) => {
    const id = req.params.id
    const course = await getById(id).lean()

    course.isOwner = course.owner.toString() == req.user?._id.toString();
    course.enrolled = course.users.map(x=>x.toString()).includes(req.user._id.toString())

    res.render('details', {
        title: course.title,
        course
    })
})

courseController.get('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const course = await getById(id);
    if (course?.owner.toString() != req.user?._id.toString()) {
        return res.redirect('/auth/login')
    }
    await deleteById(id);
    res.redirect(`/`)
})
courseController.get('/:id/edit', async (req, res) => {
    const id = req.params.id;

    const course = await getById(id).lean()
    if (course?.owner.toString() != req.user?._id.toString()) {
        return res.redirect('/auth/login')
    }
    res.render('edit', {
        title: 'Edit Page',
        course
    })
})

courseController.post('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const course = await getById(id).lean()

    if (course?.owner.toString() != req.user?._id.toString()) {
        return res.redirect('/auth/login')
    }
    try {
        await edit(id, req.body)
        res.redirect(`/course/${id}/details`)
    } catch (error) {
        const errors = parseError(error)
         res.render('edit', {
        title: 'Edit Page',
        errors,
        course:req.body
    })
   
    }
})
courseController.get('/:id/enroll', async (req, res)=>{
    const id = req.params.id;
    const course = await getById(id)
    try {
        if (course.owner.toString() == req.user._id.toString()) {
            course.isOwner = true;
            throw new Error('Cannot enroll your own course');
        }
        if (course.users.map(x=>x.toString()).includes(req.user._id.toString())) {
            course.enroll = true;
            throw new Error('Cannot enroll twice')
        }
        await enroll(id, req.user._id)
        res.redirect(`/course/${id}/details`)

    } catch (error) {
        res.render('details', {
            course,
            errors: parseError(error)
        })
    }

    
})
module.exports = courseController;