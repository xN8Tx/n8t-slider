import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import scss from 'rollup-plugin-scss';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    // name: 'version',
    plugins: [terser()],
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    scss({
      fileName: 'style/n8t-slider-style.min.css',
      outputStyle: 'compressed',
    }),
  ],
};
