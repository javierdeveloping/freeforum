// https://github.com/fridays/next-routes

const routes = require('next-routes')(); //it returns a function that is immediately executed as soon as it is returned

routes
    .add('/threads/new', '/threads/new')
    .add('/threads/:address', '/threads/show')
    .add('/threads/:address/post', '/threads/posts/new')
    .add('/threads/:address/threads/new', '/threads/requests/new');

module.exports = routes;