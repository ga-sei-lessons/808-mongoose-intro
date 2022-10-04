const db = require('./models')

const commentCrud = async () => {
    try {
        // make a blog to add comments to
        const newBlog = await db.Blog.findOneAndUpdate(
            { title: ' I love Mongoose 🖤' },
            { body: 'you should really try mongoose, it is the bees knees' },
            { upsert: true, new: true }
        )
        
        console.log('newBlog:', newBlog)

        // CREATE
        // make new comment
        const newComment = {
            header: 'OMG So True 👏',
            content: 'I am also in love with mongoose!'
        }
        // push to array of comments
        newBlog.comments.push(newComment)
        // save the parent doc (this is the async operation)
        await newBlog.save() // this puts the comment in the db

        // READ
        // find a comment by id (must find parent doc first)
        // not async
        const foundComment = newBlog.comments.id("633cba720bfb7132ac4a25ad")
        console.log('found a comment:', foundComment)

        // UPDATE
        // modify the properties of a comment
        // foundComment.content = '🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈'
        // // save the parent doc (this is async)
        // await newBlog.save()

        // DESTROY
        // .remove() is a subdocument instance method
        newBlog.comments[1].remove() // remove comment at index 1
        foundComment.remove() // makes a comment remove itself from the array
        // save the parent doc
        newBlog.save()
    } catch(err) {
        console.log(err)
    }
}

// commentCrud()

const userCrud = async () => {
    try {
        // // CREATE (associate)
        // const newUser = await db.User.create({
        //     name: 'Weston'
        // })

        // // find a blog to associate w the user
        // const foundBlog = await db.Blog.findOne({}) // find one blog -- the first one you bump into

        // // push the blog into the user's array of blogs
        // newUser.blogs.push(foundBlog)
        
        // // add the user as the blog's blogger
        // foundBlog.blogger = newUser

        // // save both models (this is async)
        // await newUser.save()
        // await foundBlog.save()

        // READ (query population)
        // .populate('field to populate')
        // const foundUser = await db.User.findOne({ name: 'Weston' }).populate('blogs')
        // console.log(foundUser)
        // populate a field in something being populated
        const foundUser = await db.User.findOne({ name: 'Weston' }).populate({
            path: 'blogs',
            populate: {
                path: 'blogger'
            }
        })
        console.log(foundUser.blogs[0].blogger)
    } catch(err) {
        console.log(err)
    }
}

userCrud()