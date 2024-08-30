export type Course = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  courseId: string;
  name: string;
  desc: string;
  start: Date;
  end: Date;
  type: string;
  status: string;
  color: string;
};
