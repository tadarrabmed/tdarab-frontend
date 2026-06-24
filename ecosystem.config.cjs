module.exports = {
  apps: [
    {
      name: 'tdarab-frontend',
      version: '1.0.0',
      script: 'npx',
      args: 'serve -s dist --listen 3000',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
      error_file: './logs/error.log',
      out_file: './logs/output.log',
      merge_logs: true,
      time: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
