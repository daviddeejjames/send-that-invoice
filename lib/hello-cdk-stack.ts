import cdk = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketName = 'send-that-invoice-data'

    new s3.Bucket(this, bucketName, {
      bucketName,
      versioned: true
    });
  }
}
