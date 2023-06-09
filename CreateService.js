import {Service} from 'node-windows'

// Create a new service object
var svc = new Service({
  name:'[Node] TerminalXMagento',
  description: 'TerminalX - Magento',
  script: 'C:\\NodeServices\\NodeMainRouter\\Services\\TerminalXMagento\\server.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();