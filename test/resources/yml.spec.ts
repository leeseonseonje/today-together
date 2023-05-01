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
});
