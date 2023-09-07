
module.exports = {
  apps: [
    {
      name: 'FEBATTLE',
      script: './ws-server/index.js',
      instances: 1,
      exec_mode: 'fork',
      cwd: './current',
      error_file: '../logs/pm2.err.log',
      out_file: '../logs/pm2.out.log',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: '45.84.225.161',
      ref: 'origin/master',
      repo: 'git@github.com:Rovniy/wg_battle.git',
      path: '/var/www/febattle/html',
      'post-deploy': 'yarn && yarn build && pm2 restart all'
    }
  }
}
