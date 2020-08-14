import * as AWS from 'aws-sdk';

const ses = new AWS.SES();

// Structure of sendMail params structure:
/*
var params = {
  Destination: {  / required /
    BccAddresses: [
      'STRING_VALUE',
      / more items /
    ],
    CcAddresses: [
      'STRING_VALUE',
      / more items /
    ],
    ToAddresses: [
      'STRING_VALUE',
      / more items /
    ]
  },
  Message: { / required /
    Body: { / required /
      Html: {
        Data: 'STRING_VALUE', / required /
        Charset: 'STRING_VALUE'
      },
      Text: {
        Data: 'STRING_VALUE', / required /
        Charset: 'STRING_VALUE'
      }
    },
    Subject: { / required /
      Data: 'STRING_VALUE', / required /
      Charset: 'STRING_VALUE'
    }
  },
  Source: 'STRING_VALUE', / required /
  ConfigurationSetName: 'STRING_VALUE',
  ReplyToAddresses: [
    'STRING_VALUE',
    / more items /
  ],
  ReturnPath: 'STRING_VALUE',
  ReturnPathArn: 'STRING_VALUE',
  SourceArn: 'STRING_VALUE',
  Tags: [
    {
      Name: 'STRING_VALUE', / required /
      Value: 'STRING_VALUE' / required /
    },
    / more items /
  ]
};
*/

export interface EmailRequest {
  to: string[],
  msg: string,
  subject: string,
  type: 'Html' | 'Text'
}

export function sendEmail({
  to, msg, type, subject,
}: EmailRequest) {
  const params: AWS.SES.Types.SendEmailRequest = {
    Destination: {
      ToAddresses: to,
    },
    Message: {
      Body: {
        [type]: {
          Data: msg,
          Charset: 'UTF-8',
        },
      },
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
    },
    Source: 'jpbaterabsb@gmail.com',
  };

  ses.sendEmail(params, (error) => {
    if (error) {
      console.log(error);
    }
  });
}
