import { type ComponentConfig } from "@superblocksteam/custom-components";

export default {
  // DO NOT CHANGE THE ID ONCE THE COMPONENT HAS BEEN REGISTERED!
  id: "02003d24-2fa1-423a-b945-47f8292c5751",
  name: "TimesheetList",
  displayName: "Timesheet List",
  componentPath: "components/TimesheetList/component.tsx",
  properties: [{
    path: "currentTimesheets",
    dataType: "any",
    propertiesPanelDisplay: {"label":"Timesheets","controlType":"js-expr"},
    isExternallyReadable: true,
    isExternallySettable: true
    },
    {
    path: "projectsList",
    dataType: "any",
    propertiesPanelDisplay: {"label":"Projects","controlType":"js-expr"},
    isExternallyReadable: true,
    isExternallySettable: true
    },{
    path: "currentWeek",
    dataType: "any",
    propertiesPanelDisplay: {"label":"WeekDays","controlType":"js-expr"},
    isExternallyReadable: true,
    isExternallySettable: true
    },],
  events: [{
    label: "OnChangeTimesheet",
    path: "onChangeTimesheet"
    },],
  gridDimensions: {
    initialColumns: 50,
    initialRows: 30,
  },
} satisfies ComponentConfig;
