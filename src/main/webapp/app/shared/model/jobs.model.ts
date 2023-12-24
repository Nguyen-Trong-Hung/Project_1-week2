import dayjs from 'dayjs';
import { ICategory } from 'app/shared/model/category.model';
import { JobStatus } from 'app/shared/model/enumerations/job-status.model';

export interface IJobs {
  id?: number;
  title?: string;
  slug?: string;
  featureImage?: string | null;
  validFrom?: dayjs.Dayjs | null;
  validThrough?: dayjs.Dayjs | null;
  status?: keyof typeof JobStatus | null;
  createdBy?: number | null;
  createdDate?: dayjs.Dayjs | null;
  updateDate?: dayjs.Dayjs | null;
  updateBy?: number | null;
  category?: ICategory | null;
}

export const defaultValue: Readonly<IJobs> = {};
