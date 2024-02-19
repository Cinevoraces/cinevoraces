import nodemon from 'nodemon';
import { replaceTscAliasPaths } from 'tsc-alias';
import Launcher from './Launcher/Launcher.mjs';

const launcher = new Launcher();

const nodemonCfg = {
    script: './dist/src/index.js',
};

launcher.onFirstSuccess(() => {
    replaceTscAliasPaths();
    nodemon(nodemonCfg);
});

launcher.onSuccess(() => replaceTscAliasPaths());
launcher.start();
