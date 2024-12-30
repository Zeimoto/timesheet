import React from "react";
import { useSuperblocksContext, useSuperblocksIsLoading } from "@superblocksteam/custom-components";
import { type Props, type EventTriggers } from "./types";
import "./main.scss";

export default function TimesheetComponent({ currentTimesheets }: Props) {
  const isLoading = useSuperblocksIsLoading();
  const {
    updateProperties,
    events: { onChangeTimesheet },
  } = useSuperblocksContext<Props, EventTriggers>();

  // Transform data into the desired format
  const transformedTimesheets = currentTimesheets.map((project: any) => {
    const groupedByDay = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    project.timesheets.forEach((entry: any) => {
      const day = new Date(entry.date).toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (groupedByDay[day] !== undefined) {
        groupedByDay[day] += entry.hours;
      }
    });

    return {
      ...project,
      hoursPerDay: groupedByDay,
      totalHours: Object.values(groupedByDay).reduce((sum: number, h: number) => sum + h, 0),
    };
  });

  const handleHoursChange = (
    projectName: string,
    day: string,
    hours: number
  ) => {
    onChangeTimesheet({
      project: projectName,
      task: null,
      day,
      hours,
    });
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {isLoading ? <div>Loading...</div> : ""}
      {!isLoading && (
        <div
          style={{
            backgroundColor: "#1c1f21",
            borderRadius: "4px",
            padding: "20px",
            width: "100%",
            height: "100%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {transformedTimesheets && transformedTimesheets.length > 0 ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr>
                  <th className="headerStyle">Project</th>
                  <th className="headerStyle">Location</th>
                  <th className="headerStyle">Billable</th>
                  <th className="headerStyle">Task</th>
                  <th className="headerStyle">Mon</th>
                  <th className="headerStyle">Tue</th>
                  <th className="headerStyle">Wed</th>
                  <th className="headerStyle">Thu</th>
                  <th className="headerStyle">Fri</th>
                  <th className="headerStyle">Sat</th>
                  <th className="headerStyle">Sun</th>
                  <th className="headerStyle">Total</th>
                </tr>
              </thead>
              <tbody>
                {transformedTimesheets.map((project: any, projectIndex: number) => (
                  <tr key={projectIndex}>
                    <td className="cellStyle"><input type="text" id="projectName" value={project.project_name}/></td>
                    <td className="cellStyle">{project.location || "N/A"}</td>
                    <td className="cellStyle">
                      <input
                        type="checkbox"
                        checked={project.timesheets.some((ts: any) => ts.billable)}
                        disabled
                      />
                    </td>
                    <td className="cellStyle">N/A</td>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <td className="cellStyle" key={day}>
                        <input
                          type="number"
                          value={project.hoursPerDay[day]}
                          onChange={(e) =>
                            handleHoursChange(project.project_name, day, +e.target.value)
                          }
                          style={{
                            width: "50px",
                            textAlign: "center",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />
                      </td>
                    ))}
                    <td className="cellStyle">{project.totalHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: "#333" }}>No timesheets available at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
}
