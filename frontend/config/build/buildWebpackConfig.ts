import webpack from 'webpack';
import path from 'path';
import buildLoaders from './buildLoaders';
import buildPlugins from './buildPlugins';
import buildResolves from './buildResolves';
import { BuildOptions } from './types/config';
import buildDevServer from './buildDevServer';

const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => {
  const { paths, mode, isDev, apiUrl } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options)
    },
    resolve: buildResolves(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: buildDevServer(options)
  };
};

export default buildWebpackConfig;
