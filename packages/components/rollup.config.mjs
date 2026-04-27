import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import packageJson from './package.json' with { type: 'json' };

export default [
    {
        input: 'src/index.ts',
        output: {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true
        },
        plugins: [peerDepsExternal(), resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json', declaration: false }), terser()]
    },
    {
        input: 'src/index.ts',
        output: {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true
        },
        plugins: [peerDepsExternal(), resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json', declarationDir: 'dist/esm' }), terser()]
    },
    
    {
        input: 'dist/esm/index.d.ts',
        output: [{ file: packageJson.types, format: 'esm' }],
        plugins: [dts()]
    }
];
