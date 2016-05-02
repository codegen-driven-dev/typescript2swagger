#!/usr/bin/env node

import * as ts from 'typescript';
import * as yargs from 'yargs';
import * as fs from 'fs';
import {generateDocumentation} from './generateDoc';
import {generateSwagger} from './generateSwagger';

const pkg_json = require('./package.json');
const pkg_version = `${pkg_json['name']} v${pkg_json['version']}`;

interface Argv extends yargs.Argv {
    f: string|string[];
    file: string|string[];

    s: string;
    swagger: string;

    d: boolean;
    doc: boolean;
}

function throw_f(msg, error = Error) {
    throw error(msg);
}

if (require.main === module) {
    const argv: Argv = <Argv>yargs
        .usage(`${pkg_version} - ${pkg_json['repository']['url']}\nUsage: $0 <command> [options]`)
        .example('$0 -f foo.ts -s swagger.json', '# Generates swagger.json from foo.ts')

        .alias('f', 'file')
        .describe('f', 'Parse TypeScript supertest-calling file')
        .demand('f')

        .boolean('d')
        .alias('d', 'doc')
        .describe('d', 'Generate classes documentation')

        .alias('s', 'swagger')
        .describe('s', 'Swagger file to output')
        .demand('s')

        .version(pkg_version)

        .help('h')
        .alias('h', 'help')

        .strict()
        .argv;

    const files: string[] = <string[]>(typeof argv.f === 'string' ? [argv.f] : argv.f);
    files.map(f => !fs.existsSync(f) && throw_f(`File: "${f}" not found`));
    // fs.existsSync(argv.s) && throw_f(`File: "${argv.s}" already exists`);

    if (argv.doc)
        generateDocumentation(files, argv.s, {
            target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
        });
    else
        generateSwagger(files, argv.swagger, {
            target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
        });
}
