export interface PostData {
    postMsg: string;
    fullName: string;
    userName: string;
    comments?: Array<PostData>;
    likeCount: number;
    retweetCount: number;
    postTime: number;
}
