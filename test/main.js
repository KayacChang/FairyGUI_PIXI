import {Application} from 'pixi.js';
import {addPackage} from '../src';

global.log = console.log;

function main(...args) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const app = new Application({width, height});
  document.body.appendChild(app.view);

  load(app).then(start);
}

function load(app) {
  app.loader.baseUrl = 'assets';
  app.loader
    .add('main@atlas0.png')
    .add('main@atlas0_1.png')
    .add('main@atlas0_2.png')
    .add('main@atlas0_3.png')
    .add('main@atlas0_4.png')
    .add('main@atlas0_5.png')
    .add('main@atlas0_6.png')
    .add('main@atlas0_7.png')
    .add('main@atlas0_8.png')
    .add('main@atlas0_9.png')
    .add('main@atlas0_10.png')
    .add('main@atlas0_11.png')
    .add('main@atlas0_12.png')
    .add('main@atlas0_13.png')
    .add('main@atlas0_14.png')
    .add('main@atlas0_15.png')
    .add('main@atlas0_16.png')
    .add('main.fui', {xhrType: 'arraybuffer'});

  return new Promise(onLoaded);

  function onLoaded(resolve) {
    app.loader.load(() => resolve(app));
  }
}

function start(app) {
  const create = addPackage(app, 'main');
  const comp = create('MainScene');

  app.stage.addChild(comp);
}

//  Execute
main();
