import AppController from './AppController';

const manager = new AppController('ws://localhost:7171');
// const manager = new AppManager('wss://___.herokuapp.com');
manager.init();
