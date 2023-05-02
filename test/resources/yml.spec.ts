import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import {YAML_PATH} from '../../src/resources/path';
import {OauthServerType} from '../../src/app/oauth2/controller/enum/oauth-server-type.enum';

describe('yml file load test', () => {
  it('yml load',  () => {
    const yml = yaml.load(readFileSync(join(YAML_PATH, 'oauth2.yml'), 'utf8')) as Record<string, any>;
    // console.log(yml);
    console.log(yml.oauth2[OauthServerType.GOOGLE]);

    console.log(OauthServerType.GOOGLE);
  });

  it('should ', async () => {
    require("dotenv").config({path: `.env.development`});
    // dotenv.config({path: `.env.development.${process.env.NODE_ENV}`});
    console.log(process.env.DB_TYPE);
    console.log(process.env.DB_PORT);
  });
});
