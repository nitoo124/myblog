interface IBlog_data{
    id:number,
    title:string,
    description:string,
    image:string,
    category:string,
    date:number,
    author:string

}
export const blog_data: IBlog_data[] = [
    {
        id: 1,
        title: "The Rise of AI: Transforming the Future",
        description: "Discover how artificial intelligence is revolutionizing industries, from healthcare to finance.",
        image: "/blogImages/ai.avif",
        category: "Technology",
        date: Date.now(),
        author: "Alex Bennett"
    },
    {
        id: 2,
        title: "Python: The Language of the Future",
        description: "Explore why Python remains the most popular programming language and how you can master it.",
        image: "/blogImages/python.avif",
        category: "Technology",
        date: Date.now(),
        author: "Alex Bennett"
    },
    {
        id: 3,
        title: "React.js: Building Interactive Web Applications",
        description: "A deep dive into React.js and why it's the go-to library for modern web development.",
        image: "/blogImages/react.avif",
        category: "Technology",
        date: Date.now(),
        author: "Alex Bennett"
    },
    {
        id: 4,
        title: "CSS Mastery: Enhancing Your Web Designs",
        description: "Learn advanced CSS techniques to create visually stunning and responsive websites.",
        image: "/blogImages/css.avif",
        category: "Technology",
        date: Date.now(),
        author: "Alex Bennett"
    },
    {
        id: 5,
        title: "The Remote Work Revolution",
        description: "Explore the benefits and challenges of remote work and how to stay productive.",
        image: "/blogImages/remote-work.avif",
        category: "Startup",
        date: Date.now(),
        author: "Alex Bennett"
    },
    {
        id: 6,
        title: "Innovative Business Ideas for Entrepreneurs",
        description: "Uncover creative startup ideas that have the potential to disrupt industries.",
        image: "/blogImages/business_ideas.avif",
        category: "Startup",
        date: Date.now(),
        author: "Alex Bennett"
    },
    {
        id: 7,
        title: "Work-Life Balance: Finding the Perfect Harmony",
        description: "Tips and strategies to maintain a healthy balance between work and personal life.",
        image: "/blogImages/Work-life-balance.avif",
        category: "LifeStyle",
        date: Date.now(),
        author: "Alex Bennett"
    },
    {
        id: 8,
        title: "Boost Your Productivity with These Simple Hacks",
        description: "Discover effective techniques to improve focus and maximize productivity.",
        image: "/blogImages/productivity.avif",
        category: "LifeStyle",
        date: Date.now(),
        author: "Alex Bennett"
    },
    {
        id: 9,
        title: "The Journey is On: Embracing Life's Challenges",
        description: "An inspiring perspective on overcoming obstacles and achieving personal growth.",
        image: "/blogImages/journey-is-on.avif",
        category: "LifeStyle",
        date: Date.now(),
        author: "Alex Bennett"
    },
    {
        id: 10,
        title: "Freelancing 101: Building a Successful Career",
        description: "A guide to starting and growing your freelancing business in today's digital world.",
        image: "/blogImages/freelancing-tips.avif",
        category: "LifeStyle",
        date: Date.now(),
        author: "Alex Bennett"
    },
];
