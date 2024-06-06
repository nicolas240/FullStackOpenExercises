
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

module.exports = {
    dummy, totalLikes, authorLike, titleLike, favoriteBlog
}