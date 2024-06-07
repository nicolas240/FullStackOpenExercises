var _=require('lodash')

const dummy = (blogs) =>{
    return 1
}
const totalLikes = (blogs)=>{
    let total=0
    blogs.forEach(b => {
        total=total+b.likes
    });
    return total
}

const authorLike = (blogs,search)=>{
    let filtered = blogs.filter(b=>b.author.toUpperCase().includes(search.toUpperCase()))
    return filtered
}

const titleLike = (blogs,search)=>{
    let filtered = blogs.filter(b=>b.title.toUpperCase().includes(search.toUpperCase()))
    return filtered
}

const favoriteBlog = (blogs)=>{
    let favorite = {position:0,likes:0}
    blogs.forEach((b,i)=>{
        if(b.likes>favorite.likes)
            favorite={position:i,likes: b.likes}
    })
    return {
        title: blogs[favorite.position].title,
        author: blogs[favorite.position].author,
        likes: blogs[favorite.position].likes
    }
}

const mostBlogs = (blogs)=>{
    let countBlogs=_.countBy(
        blogs,
        function(blog) {
            return blog.author
        }
    )
    let max ={author:0,blogs:0}
    _.forEach(Object.keys
        (countBlogs).map(
            key => 
                ({ key, value: countBlogs[key] })
        ),
        function(f){
            if(f.value>max.blogs)
                max={author:f.key,blogs:f.value}
        }
    )
    return max
}

module.exports = {
    dummy, totalLikes, authorLike, titleLike, favoriteBlog, mostBlogs
}