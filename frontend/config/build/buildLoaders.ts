import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
  const { isDev } = options;

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  };

  const cssLoader = buildCssLoader(isDev);

  const svgLoader = buildSvgLoader();

  const babelLoader = buildBabelLoader(options);
  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  };

  return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
};

export default buildLoaders;
