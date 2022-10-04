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
        foundComment.content = '🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈'
        // save the parent doc (this is async)
        await newBlog.save()

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

commentCrud()