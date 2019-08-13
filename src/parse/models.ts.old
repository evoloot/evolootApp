export interface IAvatarStash {
  objectId:string;
  createdAt:Date;
  updatedAt:Date;
  currency:number;
  itemList:Array<string>;
  equipmentList:Array<string>;
  userId:string;
}

export interface IAvatarEquips {
  objectId: string;
  createdAt: Date;
  updatedAt: Date;
  headWear:string;
  eyeWear:string;
  upperBody:string;
  lowerBody:string;
  hands:string;
  arms:string;
  leftHand:string;
  rightHand:string;
  userId:string;
}

export interface IAvatar {
  objectId: string;
  createdAt: Date;
  updatedAt: Date;
  facialHair:string;
  mouth:string;
  hairStyle:string;
  eyeColour:string;
  hairColour:string;
  level:number;
  experience:number;
  achievementScore:number;
}

export interface ICustomer {
  objectId: string;
  createdAt: Date;
  updatedAt: Date;
  firstName:string;
  lastName:string;
  birthDate:Date;
  userProfileId:string; 
}

export interface IUserProfile {
  objectId: string;
  createdAt: Date;
  updatedAt: Date;
  customerId:string;
  description:string;
  reputationScore:number;
}

export interface IAuctionListing {
  startingBid:number;
  description:string;
  modelNumber:number;
  videos:Array<string>;
  quantity:number;
  condition:string;
  buyNow:boolean;
  startDate:Date;
  length:number;
  reserve:boolean;
}

export interface IAuctionBid {
  objectId: string;
  createdAt: Date;
  updatedAt: Date;
  auctionId:string;
  bidderAvatarId:string;
  price:number;
  bidType:string;
  date:Date;
  time:Date;
}

export interface IAuctionLog {
  objectId: string;
  createdAt: Date;
  updatedAt: Date;
  auctionId:string;
  participantAvatarId:string;
  actionType:string;
  message:string;
  emoji:string;
}