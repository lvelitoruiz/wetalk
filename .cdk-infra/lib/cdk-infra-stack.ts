 
import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';


interface CloudStackProps extends cdk.StackProps {
  appName: string;
  shortRegion:string;
  domainName:string;
  arnCertificate:string;
  stage: string;
 }
 
export class CdkInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CloudStackProps) {
    super(scope, id, props);
 
    const cfredirects_rewrites = new cloudfront.Function(this, 'cfredirects_rewrites', {
      functionName: `${props.shortRegion}-cfredirects_rewrites-${props.appName}-${props.stage}`,
      code: cloudfront.FunctionCode.fromFile({filePath: './cfFunctions/redirects_rewrites.js'} )
    });
    const cfsecurity_headers = new cloudfront.Function(this, 'cfsecurity_headers', {
      functionName: `${props.shortRegion}-cfFunction_viewerResponse-${props.appName}-${props.stage}`,
      code: cloudfront.FunctionCode.fromFile({filePath: './cfFunctions/security_headers.js'} )
    });

    const functionAssociations = [
      {
        function: cfredirects_rewrites,
        eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
      },
      {
        function: cfsecurity_headers,
        eventType: cloudfront.FunctionEventType.VIEWER_RESPONSE,
      },
    ];

    const certificate = acm.Certificate.fromCertificateArn(this, 'Certificate', props.arnCertificate);

    // Crea un nuevo bucket S3 para alojar la aplicación
    const bucketName = `${props.shortRegion}-s3-${props.appName}-${props.stage}`
    new cdk.CfnOutput(this, 'bucketName', {value: bucketName});

    const websiteBucket = new s3.Bucket(this,  
      bucketName, {
      bucketName: bucketName,  
      publicReadAccess: false,
      removalPolicy:cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    }); 

    const RESPONSE_PAGE_PATH= '/index.html';

    // Crea una nueva distribución de CloudFront
    const distribution = new cloudfront.Distribution(this,
       `${this.stackName }-distribution`, {
      
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        functionAssociations: functionAssociations,
      },
      
      comment: bucketName,   
      domainNames: [props.domainName],  
      certificate: certificate,
      defaultRootObject: RESPONSE_PAGE_PATH,
      errorResponses: [ 
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: RESPONSE_PAGE_PATH,
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: RESPONSE_PAGE_PATH,
        },
      ],
    });
    
     
    new cdk.CfnOutput(this, 'distributionId', {value: distribution.distributionId});
    new cdk.CfnOutput(this, 'distributionDomainName', {value: distribution.distributionDomainName});
  }

}
