import {Service} from 'node-windows'

// Create a new service object
var svc = new Service({
  name:'[Node] Meshulam',
  description: 'Meshulam - googleSheets',
  script: 'C:\\NodeServices\\NodeMainRouter\\Services\\Meshulam\\server.js',
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