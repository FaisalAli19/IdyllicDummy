module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  // var config = require('./config.json');
  var pathStr = "PATH='$PATH:/usr/local/bin'";
  var deployToDir = '/srv/apps/idyllic';
  var currentPath =  deployToDir + "/current";

  shipit.initConfig({
    default: {
      workspace: '/tmp/github-monitor',
      deployTo: deployToDir,
      repositoryUrl: 'git@github.com:idyllicsoftware/Website-2017.git',
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 2,
      branch: 'master',
      shallowClone: false
    },
    production: {
      servers: 'ubuntu@52.55.242.106'
    }
  });

  //
  shipit.blTask('current_dir', function () {
    return shipit.remote('cd ' + currentPath);
  });

  // this task runs an NPM install remotely to install dependencies
  shipit.blTask('install', function () {
    return shipit.remote(pathStr + " && cd " + currentPath + " && npm install &> /dev/null");
  });

  // this task stops the express server
  shipit.blTask('stop_server', function () {
    // return shipit.remote("ps -ef | grep '[g]ulp' | awk {'print $2'} | xargs kill -9");
    return shipit.remote(pathStr + " && cd " + currentPath + " && /usr/bin/nohup bash -c \"npm stop > nohup2.out&\" && sleep 5; cat nohup2.out");
  });

  // this task starts the server directly in the shipit output. use screen command if it better helps.
  shipit.blTask('start_server', function () {
    return shipit.remote(pathStr + " && cd " + currentPath + " && /usr/bin/nohup bash -c \"npm start > nohup2.out&\" && sleep 5; cat nohup2.out");
  });

  // this task copies the config.json from the remote source's root into the current folder
  shipit.blTask('install_remote_config', function () {
    return shipit.remote("cd " + config.deploy.path + " && cp config.json " + currentPath);
  });

  shipit.on('deployed', function () {
    // this series of tasks will result in a good deploy assuming everything is \working
    shipit.start( 'current_dir', 'stop_server', 'install', 'start_server');
    // if you're having problems with the deploy being successful, but not actually starting the server, try this:
    //shipit.start('kill_screen', 'install', 'install_config', 'start_session');
  });
};
