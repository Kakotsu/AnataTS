import chalk from 'chalk';
import { AnataClient } from '../../Client';

export let open = {
    name: 'open',
    type: 'mongo',
    execute () {
        console.log(chalk.hex(`#1F51FF`)(`Successfully connected to database!`));
    }
}