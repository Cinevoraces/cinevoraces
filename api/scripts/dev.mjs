import nodemon from 'nodemon';
import { replaceTscAliasPaths } from 'tsc-alias';
import Launcher from './Launcher/Launcher.mjs';
import { replaceSeparator } from './Launcher/utils/replaceSeparator.mjs';

const launcher = new Launcher();

const nodemonCfg = {
    script: replaceSeparator('./dist/src/index.js'),
    exec: 'node --inspect=0.0.0.0:9229',
};

launcher.onFirstSuccess(() => {
    replaceTscAliasPaths();
    console.log('Starting nodemon...');
    nodemon(nodemonCfg);
});

launcher.onSuccess(() => {
    console.log('hot-reloading...');
    replaceTscAliasPaths();
});

launcher.start();
