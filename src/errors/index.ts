const errorType = {
  ValidationFails: 'ValidationFails',
  IncorrectPassword: 'IncorrectPassword',
  UserNotExists: 'UserNotExists',
  InternalServerError: 'InternalServerError',
  TokenRequired: 'TokenRequired',
  InvalidToken: 'InvalidToken',
  InvalidAccess: 'InvalidAccess',
  NoCommunityToManage: 'NoCommunityToManage',
  NoCommunityMembership: 'NoCommunityMembership',
  NoCompanyToManage: 'NoCompanyToManage',
  UserNotManageThisCompany: 'UserNotManageThisCompany',
  UserNotManageThisCommunity: 'UserNotManageThisCommunity',
  InvalidInvitationCode: 'InvalidInvitationCode',
  CommunityAlreadyAdded: 'CommunityAlreadyAdded',
  CampaignAlreadyAdded: 'CampaignAlreadyAdded',
  CampaignAlreadyApproved: 'CampaignAlreadyApproved',
  CampaignAlreadyDenied: 'CampaignAlreadyDenied',
  CampaignMustBeApproved: 'CampaignMustBeApproved',
  CampaignAlreadyFinished: 'CampaignAlreadyFinished',
  CampaignDenied: 'CampaignDenied',
  NoCampaignTarget: 'NoCampaignTarget',
  communityNotRevisedYet: 'communityNotRevisedYet',
  InvitationCodeAlreadyUsed: 'InvitationCodeAlreadyUsed',
  InvalidFileSize: 'InvalidFileSize',
  BakerAlreadyExistsWithThisEmailOrCnpj: 'BakerAlreadyExistsWithThisEmailOrCnpj',
  NotExists: (entity:string) => `${entity}NotExists`,
  AlreadyExists: (entity:string) => `${entity}AlreadyExists`,
};

export default errorType;
