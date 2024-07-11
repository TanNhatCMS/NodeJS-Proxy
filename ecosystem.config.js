module.exports = {
    apps: [
        {
            name: 'proxy',
            script: './bin/www',
            node_args: ['--inspect'],
            watch: true,
            ignore_watch: ['public/**/*', 'views/**/*.ejs'],
            env: {
                NODE_ENV: 'production',
                FRONTEND_URL:'https://localhost:3001',
                PORT: 3001
            },
            env_development: {
                NODE_ENV: 'development',
                FRONTEND_URL:'https://localhost:3001',
                PORT: 3001
            }
        }
    ]
};
