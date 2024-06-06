
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
    console.log('filtered::: ', filtered);
    return filtered
}

module.exports = {
    dummy, totalLikes,authorLike,titleLike
}