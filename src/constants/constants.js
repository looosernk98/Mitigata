import { MdGroups } from "react-icons/md"; // group
import { RiUserForbidFill } from "react-icons/ri"; // blocked
import { LiaUserTimesSolid } from "react-icons/lia"; // inactive
import { LiaUserCheckSolid } from "react-icons/lia"; // active

export const ICONS = {
  TOTAL: MdGroups,
  ACTIVE: LiaUserCheckSolid,
  INVITED: LiaUserTimesSolid,
  BLOCKED: RiUserForbidFill,
};

export const ACTIVE = 'ACTIVE'
export const INVITED = 'INVITED'
export const BLOCKED = 'BLOCKED'
export const TOTAL = 'TOTAL'

export const ASC_ORDER = 'asc'
export const DESC_ORDER = 'desc'

export const DATE_FORMAT = "YYYY-MM-DD";

export const USER_STATUS_DETAILS = [
  {
    title: "Total Users",
    key: "TOTAL",
    count: 0,
  },
  {
    title: "Active Users",
    key: "ACTIVE",
    count: 0,
  },
  {
    title: "Inactive Users",
    key: "INVITED",
    count: 0,
  },
  {
    title: "Blocked Users",
    key: "BLOCKED",
    count: 0,
  },
];
