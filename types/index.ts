export interface CustomButtonProps {
  btnTitle: string;
  method: () => void;
}

export interface urlData {
  url: {_id: string; shortUrl: string};
  createdAt: Date;
  siteName: string;
}

export interface userUrl {
  objectId: string;
  createdAt: Date;
}
