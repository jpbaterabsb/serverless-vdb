export const fileType: FileType = {
  profilePhoto: { id: 1, path: 'profile_photo' },
};

interface FileType {
  [key:string]:Data,
}

interface Data{
  id: number,
  path: string
}

export const findFileTypeById = async (id:number) => Object.keys(fileType)
  .filter((key) => fileType[key].id === id)
  .map((key) => fileType[key].path);
