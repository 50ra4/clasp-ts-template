import { execSync } from 'child_process';
import { Command } from 'commander';
import { isNone } from 'fp-ts/lib/Option';
import { findFirst } from 'fp-ts/lib/Array';
import { flow, pipe } from 'fp-ts/lib/function';
import { Either, isLeft, toError, tryCatch, getOrElse } from 'fp-ts/lib/Either';
import { createEnvironmentFile, readJsonFile, throwError, exitProcessError } from './utils';
import {
  SCRIPT_OPTION,
  DEFAULT_CLAPS_LOGIN_FILE_PATH,
  DEFAULT_CLAPS_SETTING_FILE_PATH,
  ClaspLoginInfo,
  ClaspSetting,
  DEFAULT_ENVIRONMENT_FILE_PATH,
} from './constants';

const getOptions = () =>
  new Command()
    .option(
      `-d, --${SCRIPT_OPTION.deploymentName} [deploymentName]`, //
      'clasp deployment name',
      'Production',
    )
    .option(
      `-rcp, --${SCRIPT_OPTION.clasprcPath} [filepath]`,
      'import path ".clasprc.json"',
      DEFAULT_CLAPS_LOGIN_FILE_PATH,
    )
    .option(
      `-p, --${SCRIPT_OPTION.claspPath} [filepath]`, //
      'import path ".clasp.json"',
      DEFAULT_CLAPS_SETTING_FILE_PATH,
    )
    .parse(process.argv)
    .opts();

const findByDeploymentName = (deploymentName: string): Either<Error, string> =>
  tryCatch(
    flow(
      () => execSync('npx clasp deployments').toString().split('\n'),
      findFirst((deployment: string) => deployment.includes(deploymentName)),
      (deployment) => {
        if (isNone(deployment)) {
          throw Error(`"${deploymentName}" is not found clasp deployments`);
        }
        return deployment.value.split(' ')[1];
      },
    ),
    (e) => toError(e),
  );

const main = () =>
  tryCatch(() => {
    const options = getOptions();

    const refreshToken = pipe(
      readJsonFile<ClaspLoginInfo>(options[SCRIPT_OPTION.clasprcPath]),
      getOrElse<Error, ClaspLoginInfo>(throwError),
      ({ token }) => token.refresh_token,
    );

    const scriptId = pipe(
      readJsonFile<ClaspSetting>(options[SCRIPT_OPTION.claspPath]),
      getOrElse<Error, ClaspSetting>(throwError),
      (setting) => setting.scriptId,
    );

    const deploymentId = pipe(
      findByDeploymentName(options[SCRIPT_OPTION.deploymentName]),
      getOrElse<Error, string>(throwError),
    );

    const result = createEnvironmentFile(DEFAULT_ENVIRONMENT_FILE_PATH, {
      REFRESH_TOKEN: refreshToken,
      SCRIPT_ID: scriptId,
      DEPLOYMENT_ID: deploymentId,
    });

    if (isLeft(result)) {
      throw result.left;
    }

    process.exit(0);
  }, exitProcessError);

main();
