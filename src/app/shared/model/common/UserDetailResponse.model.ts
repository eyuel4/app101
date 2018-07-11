import { ChannelsResponse } from './ChannelsResponse.model';

export class UserDetailResponse {
    public userId : number;
    public username : string;
    public firstName : string;
    public lastName : string;
    public middleName : string;
    public photoUrl : string;
    public acctActivated : boolean;
    public mySubscription : ChannelsResponse;
}