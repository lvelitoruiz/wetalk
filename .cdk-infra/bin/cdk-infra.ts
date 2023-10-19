#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkInfraStack } from '../lib/cdk-infra-stack';

const appName='lau-wetalk-fe';
 
const app = new cdk.App();

const shortRegion=shortenAwsRegion(process.env._CDK_AWS_ACCOUNT_REGION||'');

const stackName= `${appName}-${process.env.STAGE}`;

new CdkInfraStack(app,stackName, {  
  env: { 
  account: process.env._CDK_AWS_ACCOUNT_ID,
  region: process.env._CDK_AWS_ACCOUNT_REGION ||"us-east-1" },
  domainName:`${process.env._CDK_APP_DOMAIN_NAME}`,
  arnCertificate:`${process.env._CDK_ARN_CERTIFICATE}` ,
  appName:appName,    
  shortRegion:shortRegion,
  stage:`${process.env.STAGE}`    
});

function shortenAwsRegion(region: string): string {
  const segments = region.split("-");
  const letters = segments.slice(0, -1).map(segment => segment.charAt(0));
  const number = segments[segments.length - 1];
  return letters.join("") + number;
}
